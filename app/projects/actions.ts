'use server'

import { PostgrestError } from '@supabase/supabase-js'
import { createClient } from '../_utils/supabase/server'
import { Project, ProjectListing } from '../types'

export async function fetchProjects(): Promise<{
  data?: ProjectListing[]
  error?: PostgrestError
}> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .select(`project_uuid,name,brief_description,banner_url`)

  if (error) {
    return { error: error }
  }

  return {
    data: data.map((value): ProjectListing => {
      return {
        id: value.project_uuid,
        name: value.name,
        briefDescription: value.brief_description,
        bannerUrl: value.banner_url,
      }
    }),
  }
}

export async function fetchProjectById(id: string): Promise<{
  data?: Project | null
  error?: PostgrestError
}> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select(`*,accounts(username, accent_color)`)
    .eq('project_uuid', id)
    .single()

  if (error) {
    return { error: error }
  }

  const parsedProject: Project = {
    id: data.project_uuid,
    name: data.name,
    briefDescription: data.brief_description,
    description: data.description,
    authorAccount: {
      id: data.author_uuid,
      username: data.accounts.username,
      accentColor: data.accounts.accent_color,
    },
    bannerUrl: data.banner_url,
    files: data.files,
    images: data.images,
  }

  return { data: parsedProject }
}
