export type Project = {
  id: number
  projectName: string
  projectBriefDescription: string
  projectDescription: string
  projectAuthor: Account
  bannerUrl: string
  images: Image[]
  files: FileData[]
}

export type Image = {
  imageUrl: string
  imageDescription: string
  aspectRatio?: string
}

export type Account = {
  id: number
  accountName: string
  accentColor: string
}

export type FileData = {
  fileName: string
  fileType: string
  fileUrl: string
}
