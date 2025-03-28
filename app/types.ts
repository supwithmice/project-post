export function isImage(value: any): value is Image {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Image).imageUrl === 'string' &&
    typeof (value as Image).imageDescription === 'string'
  )
}

export function isFileData(value: any): value is FileData {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as FileData).fileName === 'string' &&
    typeof (value as FileData).fileType === 'string' &&
    typeof (value as FileData).fileUrl === 'string'
  )
}

export type Project = {
  id: string
  name: string
  briefDescription: string
  description: string | null
  authorAccount: Account
  bannerUrl: string | null
  images: Image[]
  files: FileData[]
}

export type ProjectListing = {
  id: string
  name: string
  briefDescription: string
  bannerUrl: string | null
}

export type Image = {
  imageUrl: string
  imageDescription: string
  aspectRatio?: string
}

export type Account = {
  id: string
  username: string
  accentColor: string
}

export type FileData = {
  fileName: string
  fileType: string
  fileUrl: string
}

export type ProjectSubmit = {
  name: string
  briefDescription: string
  description: string | undefined
  banner: File | string | undefined
  images:
    | {
        file: File
        description: string
      }[]
    | Image[]
  files: File[] | FileData[]
}

export type FileWithDesc = {
  file: File
  description: string
}
