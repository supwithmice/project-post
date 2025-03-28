'use server'

import { User } from '@supabase/supabase-js'
import { createClient } from '../_utils/supabase/server'
import { Project, isImage, isFileData, ProjectSubmit } from '../types'
import { baseUrl } from '../_utils/supabase/client'
import { revalidatePath } from 'next/cache'
import { getUploader } from '../create/actions'

export async function fetchUserAndProjects(): Promise<{
  user?: User
  error?: string
  projects?: Project[]
}> {
  const supabase = await createClient()
  const userResponse = await supabase.auth.getUser()
  if (userResponse.error) {
    console.error(userResponse.error)
    return { error: 'getUser()' }
  }

  const { data, error } = await supabase
    .from('projects')
    .select(`*,accounts(username, accent_color)`)
    .eq('author_uuid', userResponse.data.user.id)

  if (error) {
    console.error(error)
    return { error: 'fetch error' }
  }

  const projects: Project[] = data.map((values): Project => {
    const images = Array.isArray(values.images)
      ? values.images.filter(isImage)
      : []

    const files = Array.isArray(values.files)
      ? values.files.filter(isFileData)
      : []

    return {
      id: values.project_uuid,
      name: values.name,
      briefDescription: values.brief_description,
      description: values.description,
      authorAccount: {
        id: values.author_uuid,
        username: values.accounts.username,
        accentColor: values.accounts.accent_color,
      },
      bannerUrl: values.banner_url,
      files: files,
      images: images,
    }
  })

  return { user: userResponse.data.user, projects: projects }
}

export async function deleteAccount(
  projects: Project[]
): Promise<{ error?: string }> {
  const supabase = await createClient()

  if (projects.length > 0) {
    //delete files
    let deleteQueue = []
    for (const project of projects) {
      const filesToRemove = project.files.map((file) =>
        file.fileUrl.replace(baseUrl + 'files', '')
      )
      const imagesToRemove = project.images.map((image) =>
        image.imageUrl.replace(baseUrl + 'files', '')
      )
      deleteQueue.push(...[...filesToRemove, ...imagesToRemove])
    }
    if (deleteQueue.length > 1) {
      const storageResponse = await supabase.storage
        .from('files')
        .remove(deleteQueue)
      if (storageResponse.error) {
        console.error(storageResponse.error)
        return { error: 'storage error' }
      }
    }
  }

  // delete user and all other database entries
  // @ts-ignore (it doesn't like rpc)
  const authResponse = await supabase.rpc('delete_user')
  if (authResponse.error) {
    console.error(authResponse.error)
    return { error: 'rpc error' }
  }

  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error(error)
    return { error: 'signOut() error' }
  }

  revalidatePath('/')
  return {}
}

export async function changeMetadata(
  newName: string,
  newColor: string
): Promise<{ error?: string }> {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    console.error(error)
    return { error: 'getUser() error' }
  }

  if (
    newName === user.user_metadata.username &&
    newColor === user.user_metadata.accent_color
  ) {
    revalidatePath('/account')
    return {}
  }

  const res = await supabase.auth.updateUser({
    data: {
      username: newName,
      accent_color: newColor,
    },
  })

  if (res.error) {
    console.log(error)
    return { error: 'updateUser() error' }
  }
  return {}
}

export async function editProject(
  projectUid: string,
  newProject: ProjectSubmit
): Promise<{ error?: string }> {
  const uploader = await getUploader(projectUid)
  if (typeof uploader === 'string') {
    console.error(uploader)
    return { error: uploader }
  }

  // upload files
  const fileRes = await uploader.uploadFiles(newProject.files)
  if (fileRes.error) {
    console.error(fileRes.error)
    return { error: 'file upload error' }
  }

  //upload images
  const imageRes = await uploader.uploadImages(newProject.images)
  if (imageRes.error) {
    console.error(imageRes.error)
    return { error: 'image upload error' }
  }

  let banner
  if (newProject.banner) {
    // upload banner
    const bannerRes = await uploader.uploadBanner(newProject.banner)
    if (bannerRes.error) {
      console.error(bannerRes.error)
      return { error: 'banner upload error' }
    }
    banner = bannerRes.bannerFullPath
  }

  // update database entry
  const dbRes = await uploader.updateEntry(
    newProject,
    imageRes.imageList!,
    fileRes.fileList!,
    banner
  )
  if (dbRes.error) {
    console.error(dbRes.error)
    return { error: 'database error' }
  }

  revalidatePath('/account')
  revalidatePath(`/projects/${projectUid}`)
  revalidatePath('/')
  return {}
}

export async function deleteProject(
  projectUid: string
): Promise<{ error?: string }> {
  const supabase = await createClient()

  // delete project entry
  const dbRes = await supabase
    .from('projects')
    .delete()
    .eq('project_uuid', projectUid)
    .select()
    .single()

  if (dbRes.error) {
    console.error(dbRes.error)
    return { error: 'database error' }
  }

  if (dbRes.data.files.length > 1 || dbRes.data.images.length > 1) {
    // delete project files
    const filesToRemove = dbRes.data.files.map((file) =>
      // @ts-ignore (nope. not dealing with that)
      file.fileUrl.replace(baseUrl + 'files', '')
    )
    const imagesToRemove = dbRes.data.images.map((image) =>
      // @ts-ignore
      image.imageUrl.replace(baseUrl + 'files', '')
    )
    const storageRes = await supabase.storage
      .from('files')
      .remove([...filesToRemove, ...imagesToRemove])
    if (storageRes.error) {
      console.error(storageRes.error)
      return { error: 'storage error' }
    }
  }

  revalidatePath('/account')
  revalidatePath('/')
  return {}
}
