import { Json } from "./_utils/supabase/supabaseTypes"

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
