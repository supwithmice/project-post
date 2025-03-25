'use server'

import { redirect } from 'next/navigation'
import { FileData, Image } from '../types'
import { createClient } from '../utils/supabase/server'
import { ProjectSubmit } from './page'
import * as crypto from 'crypto'

// generated. not dealing with crypto lol
async function getFileMD5FromBuffer(fileBuffer: Promise<ArrayBuffer>) {
  const resolvedBuffer = await fileBuffer
  const buffer = Buffer.isBuffer(resolvedBuffer)
    ? resolvedBuffer
    : Buffer.from(resolvedBuffer)
  return crypto.createHash('md5').update(buffer).digest('hex')
}


export async function submitProject(
  project: ProjectSubmit
): Promise<{ error: any; errorType?: string }> {
  const supabase = await createClient()
  const user = await supabase.auth.getUser()
  if (user.error || !user.data.user) {
    return { error: user.error, errorType: 'user error' }
  }

  const baseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/`
  const projectUid = crypto.randomUUID()
  // upload files
  let fileList: FileData[] = []

  for await (const file of project.files) {
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
    const { data, error } = await supabase.storage
      .from('images')
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
  if (project.banner) {
    banner = await supabase.storage
      .from('images')
      .upload(
        `/${user.data.user.id}/${projectUid}/banner/${
          project.banner.name
        }`,
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
    project_uid: projectUid,
    name: project.projectName,
    brief_description: project.projectBriefDescription,
    description: project.projectDescription,
    author_uuid: user.data.user.id,
    banner_url: project.banner ? baseUrl + (banner?.data?.fullPath ?? null) : null,
    images: imageList,
    files: fileList,
  })
  if (dbResponse.error) {
    return { error: dbResponse.error, errorType: 'database error' }
  }
  return { error: undefined } 
}
