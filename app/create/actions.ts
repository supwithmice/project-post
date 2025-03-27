'use server'

import { FileData, Image, isFileData, isImage, ProjectSubmit } from '../types'
import { createClient } from '../_utils/supabase/server'
import * as crypto from 'crypto'
import { baseUrl } from '../_utils/supabase/client'

// generated. not dealing with crypto lol
export async function getFileMD5FromBuffer(fileBuffer: Promise<ArrayBuffer>) {
  const resolvedBuffer = await fileBuffer
  const buffer = Buffer.isBuffer(resolvedBuffer)
    ? resolvedBuffer
    : Buffer.from(resolvedBuffer)
  return crypto.createHash('md5').update(buffer).digest('hex')
}

export async function submitProject(
  project: ProjectSubmit
): Promise<{ error: any; errorType?: string, uid?: string }> {
  const supabase = await createClient()
  const user = await supabase.auth.getUser()
  if (user.error || !user.data.user) {
    return { error: user.error, errorType: 'user error' }
  }

  /* the annual risk of a given person being hit by a meteorite is estimated to be one chance in 17 billion, which means the probability is about 0.00000000006 (6 × 10^−11), equivalent to the odds of creating a few tens of trillions of UUIDs in a year and having one duplicate. In other words, only after generating 1 billion UUIDs every second for the next 100 years, the probability of creating just one duplicate would be about 50%. */
  const projectUid = crypto.randomUUID()

  // upload files
  let fileList: FileData[] = []

  for await (const file of project.files) {
    if (isFileData(file)){
      continue
    }
    const { data, error } = await supabase.storage
      .from('files')
      .upload(
        `/${user.data.user.id}/${projectUid}/${await getFileMD5FromBuffer(
          file.arrayBuffer()
        )}/${file.name}`,
        file,
        {
          upsert: true,
        }
      )
    if (error) {
      return { error: error, errorType: 'file upload error' }
    } else {
      fileList.push({
        fileName: file.name,
        fileType: file.type,
        fileUrl: baseUrl + data.fullPath,
      })
    }
  }

  //upload images
  let imageList: Image[] = []

  for await (const image of project.images) {
    if (isImage(image)){
      continue
    }
    const { data, error } = await supabase.storage
      .from('files')
      .upload(
        `/${user.data.user.id}/${projectUid}/${await getFileMD5FromBuffer(
          image.file.arrayBuffer()
        )}/${image.file.name}`,
        image.file,
        {
          upsert: true,
        }
      )
    if (error) {
      return { error: error, errorType: 'image upload error' }
    } else {
      imageList.push({
        imageUrl: baseUrl + data.fullPath,
        imageDescription: image.description,
        // aspectRatio: '???', // no idea how to do this
      })
    }
  }

  // upload banner
  let banner = null
  if (project.banner && typeof project.banner !== 'string') {
    banner = await supabase.storage
      .from('images')
      .upload(
        `/${user.data.user.id}/${projectUid}/banner/${project.banner.name}`,
        project.banner,
        {
          upsert: true,
        }
      )
    if (banner.error) {
      return { error: banner.error, errorType: 'banner error' }
    }
  }

  // add database entry
  const dbResponse = await supabase.from('projects').insert({
    project_uuid: projectUid,
    name: project.name.trim(),
    brief_description: project.briefDescription.trim(),
    description: project.description ? project.description.trim() : undefined,
    author_uuid: user.data.user.id,
    banner_url: project.banner
      ? baseUrl + (banner?.data?.fullPath ?? null)
      : null,
    images: imageList,
    files: fileList,
  })
  if (dbResponse.error) {
    return { error: dbResponse.error, errorType: 'database error' }
  }
  return { error: undefined, uid: projectUid }
}
