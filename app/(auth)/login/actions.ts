'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../../_utils/supabase/server'
import {
  AuthError,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/auth-js'
import { StorageError } from '@supabase/storage-js'

export async function login(
  user: SignInWithPasswordCredentials
): Promise<{ error: AuthError | null }> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword(user)

  if (error) {
    return { error: error }
  }
  revalidatePath('/')
  return { error: null }
}

export async function signup(data: {
  username: string
  email: string
  password: string
  accentColor: string
}): Promise<{ error: AuthError | StorageError | null }> {
  const supabase = await createClient()

  const user: SignUpWithPasswordCredentials = {
    email: data.email,
    password: data.password,
    options: {
      data: {
        accent_color: data.accentColor,
        username: data.username,
      },
    },
  }

  const userResponse = await supabase.auth.signUp(user)

  if (userResponse.error || !userResponse.data.user) {
    return { error: userResponse.error }
  }

  const buckerResponse = await supabase.storage.createBucket(
    userResponse.data.user.id,
    {
      public: true,
    }
  )

  if (buckerResponse.error) {
    return { error: buckerResponse.error }
  }

  revalidatePath('/')
  return { error: null }
}

export async function signOut(): Promise<{ error: AuthError | null }> {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: error }
  }
  revalidatePath('/')
  return { error: null }
}
