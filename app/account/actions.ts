'use server'

import { AuthError, PostgrestError, User } from '@supabase/supabase-js'
import { createClient } from '../_utils/supabase/server'
import { Project, isImage, isFileData } from '../types'
import { baseUrl } from '../_utils/supabase/client'
import { signOut } from '../(auth)/login/actions'

export async function fetchUserProjects(): Promise<{
  user?: User
  error?: AuthError | PostgrestError
  projects?: Project[]
}> {
  const supabase = await createClient()
  const userResponse = await supabase.auth.getUser()
  if (userResponse.error) {
    return { error: userResponse.error }
  }

  const { data, error } = await supabase
    .from('projects')
    .select(`*,accounts(username, accent_color)`)
    .eq('author_uuid', userResponse.data.user.id)

  if (error) {
    return { error: error }
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
  user: User,
  projects: Project[]
): Promise<{ error?: any }> {
  const supabase = await createClient()

  //delete files
  let deleteQueue = []
  for (const project of projects) {
    const filesToRemove = project.files.map((file) =>
      file.fileUrl.replace(baseUrl + 'files', '')
    )
    const imagesToRemove = project.files.map((file) =>
      file.fileUrl.replace(baseUrl + 'files', '')
    )
    deleteQueue.push(...[...filesToRemove, ...imagesToRemove])
  }
  const storageResponse = await supabase.storage
    .from('files')
    .remove(deleteQueue)
  if (storageResponse.error) {
    return { error: storageResponse.error }
  }

  // delete user and all other database entries
  const authResponse = await supabase.rpc('delete_user')
  if (authResponse.error) {
    return { error: authResponse.error }
  }

  const { error } = await supabase.auth.signOut()
  if (error) {
    return { error: error }
  }
  return {}
}

export async function changeName(
  user: User,
  name: string
): Promise<{ error: any }> {
  const supabase = await createClient()

  // TODO: implement
}

export async function editProject(
  projectUid: string,
  newProject: ProjectSubmit
): Promise<{ error: any }> {
  // TODO: implement
  const supabase = await createClient()

  // const { error } = await supabase
  // .from('projects')
  // .update({  })
  // .eq('project_uuid', )
}
