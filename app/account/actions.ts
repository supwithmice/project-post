import { AuthError, PostgrestError, User } from '@supabase/supabase-js'
import { createClient } from '../_utils/supabase/server'
import { Project } from '../types'

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
      files: values.files,
      images: values.images,
    }
  })

  return { user: userResponse.data.user, projects: projects }
}
