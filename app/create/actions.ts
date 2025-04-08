'use server'

import {
  FileData,
  FileWithDesc,
  Image,
  isFileData,
  isImage,
  ProjectSubmit,
} from '../types'
import { createClient } from '../_utils/supabase/server'
import * as crypto from 'crypto'
import { baseUrl } from '../_utils/supabase/client'
import { StorageError } from '@supabase/storage-js'
import { PostgrestError } from '@supabase/supabase-js'

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
): Promise<{ error?: string; uid?: string }> {
  /* the annual risk of a given person being hit by a meteorite is estimated to be one chance in 17 billion, which means the probability is about 0.00000000006 (6 × 10^−11), equivalent to the odds of creating a few tens of trillions of UUIDs in a year and having one duplicate. In other words, only after generating 1 billion UUIDs every second for the next 100 years, the probability of creating just one duplicate would be about 50%. */
  const projectUid = crypto.randomUUID()
  const uploader = await getUploader(projectUid)
  if (typeof uploader === 'string') {
    console.error(uploader)
    return { error: uploader }
  }

  // upload files
  const fileRes = await uploader.uploadFiles(project.files)
  if (fileRes.error) {
    console.error(fileRes.error)
    return { error: 'file upload error' }
  }

  //upload images
  const imageRes = await uploader.uploadImages(project.images)
  if (imageRes.error) {
    console.error(imageRes.error)
    return { error: 'image upload error' }
  }

  let banner
  if (project.banner) {
    // upload banner
    const bannerRes = await uploader.uploadBanner(project.banner)
    if (bannerRes.error) {
      console.error(bannerRes.error)
      return { error: 'banner upload error' }
    }
    banner = bannerRes.bannerUrl
  }

  // add database entry
  const dbRes = await uploader.createEntry({
    name: project.name,
    briefDescription: project.briefDescription,
    description: project.description,
    fileList: fileRes.fileList ? fileRes.fileList : [],
    imageList: imageRes.imageList ? imageRes.imageList : [],
    bannerUrl: banner,
  })
  if (dbRes.error) {
    console.error(dbRes.error)
    return { error: 'database error' }
  }
  return { uid: projectUid }
}

// oh hell naw
interface ProjectUploader {
  uploadFiles: (
    files: File[] | FileData[] | (File | FileData)[]
  ) => Promise<{ error?: StorageError; fileList?: FileData[] }>
  uploadImages: (
    images: FileWithDesc[] | Image[] | (FileWithDesc | Image)[]
  ) => Promise<{ error?: StorageError; imageList?: Image[] }>
  uploadBanner: (
    banner: File
  ) => Promise<{ error?: StorageError; bannerUrl?: string }>
  createEntry: (params: {
    name: string
    briefDescription: string
    description?: string
    bannerUrl?: string
    imageList: Image[]
    fileList: FileData[]
  }) => Promise<{ error?: PostgrestError }>
  updateEntry: (params: {
    name: string
    briefDescription: string
    description?: string
    bannerUrl?: string
    imageList: Image[]
    fileList: FileData[]
  }) => Promise<{ error?: PostgrestError }>
}

export async function getUploader(
  projectUid: string
): Promise<ProjectUploader | string> {
  const supabase = await createClient()

  // get user
  const userRes = await supabase.auth.getUser()
  if (userRes.error || !userRes.data.user) {
    return 'auth error'
  }
  const user = userRes.data.user

  async function uploadFiles(
    files: File[] | FileData[] | (File | FileData)[]
  ): Promise<{ error?: StorageError; fileList?: FileData[] }> {
    let fileList: FileData[] = []

    for await (const file of files) {
      if (isFileData(file)) {
        fileList.push(file)
        continue
      }
      const { data, error } = await supabase.storage
        .from('files')
        .upload(
          `/${user.id}/${projectUid}/${await getFileMD5FromBuffer(
            file.arrayBuffer()
          )}/${file.name}`,
          file,
          {
            upsert: true,
          }
        )
      if (!error && data) {
        fileList.push({
          fileName: file.name,
          fileType: file.type,
          fileUrl: baseUrl + data.fullPath,
        })
        continue
      }

      if (error.message.startsWith('Invalid key:')) {
        // filename contains forbidden symbols. rename and try again
        const { data, error } = await supabase.storage
          .from('files')
          .upload(
            `/${user.id}/${projectUid}/${await getFileMD5FromBuffer(
              file.arrayBuffer()
            )}.${file.name.split('.').pop()}`,
            file,
            {
              upsert: true,
            }
          )
        if (!error && data) {
          fileList.push({
            fileName: file.name,
            fileType: file.type,
            fileUrl: baseUrl + data.fullPath,
          })
          continue
        }
      }
      // otherwise generic error
      return { error: error }
    }
    return { fileList: fileList }
  }

  async function uploadImages(
    images: FileWithDesc[] | Image[] | (FileWithDesc | Image)[]
  ): Promise<{ error?: StorageError; imageList?: Image[] }> {
    let imageList: Image[] = []

    for await (const image of images) {
      if (isImage(image)) {
        imageList.push(image)
        continue
      }
      const { data, error } = await supabase.storage
        .from('files')
        .upload(
          `/${user.id}/${projectUid}/${await getFileMD5FromBuffer(
            image.file.arrayBuffer()
          )}/${image.file.name}`,
          image.file,
          {
            upsert: true,
          }
        )
      if (error) {
        return { error: error }
      } else {
        imageList.push({
          imageUrl: baseUrl + data.fullPath,
          imageDescription: image.description,
        })
      }
    }
    return { imageList: imageList }
  }

  async function uploadBanner(
    banner: File
  ): Promise<{ error?: StorageError; bannerUrl?: string }> {
    const { data, error } = await supabase.storage
      .from('files')
      .upload(
        `/${user.id}/${projectUid}/${await getFileMD5FromBuffer(
          banner.arrayBuffer()
        )}`,
        banner,
        {
          upsert: true,
        }
      )
    if (error) {
      return { error: error }
    }
    return { bannerUrl: baseUrl + data.fullPath }
  }

  async function createEntry({
    name,
    briefDescription,
    description,
    bannerUrl,
    imageList,
    fileList,
  }: {
    name: string
    briefDescription: string
    description?: string
    bannerUrl?: string
    imageList: Image[]
    fileList: FileData[]
  }): Promise<{ error?: PostgrestError }> {
    const { error } = await supabase.from('projects').insert({
      project_uuid: projectUid,
      name: name.trim(),
      brief_description: briefDescription.trim(),
      description: description ? description.trim() : undefined,
      author_uuid: user.id,
      banner_url: bannerUrl ? bannerUrl : undefined,
      images: imageList,
      files: fileList,
    })
    if (error) {
      return { error: error }
    }
    return {}
  }

  async function updateEntry({
    name,
    briefDescription,
    description,
    bannerUrl,
    imageList,
    fileList,
  }: {
    name: string
    briefDescription: string
    description?: string
    bannerUrl?: string
    imageList: Image[]
    fileList: FileData[]
  }): Promise<{ error?: PostgrestError }> {
    const { error } = await supabase
      .from('projects')
      .update({
        project_uuid: projectUid,
        name: name.trim(),
        brief_description: briefDescription.trim(),
        description: description ? description.trim() : undefined,
        author_uuid: user.id,
        banner_url: bannerUrl ? bannerUrl : undefined,
        images: imageList,
        files: fileList,
      })
      .eq('project_uuid', projectUid)
    if (error) {
      return { error: error }
    }
    return {}
  }

  return { uploadFiles, uploadImages, uploadBanner, createEntry, updateEntry }
}
