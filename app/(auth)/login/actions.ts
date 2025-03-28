'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../../_utils/supabase/server'
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/auth-js'

export async function login(
  user: SignInWithPasswordCredentials
): Promise<{ error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword(user)

  if (error) {
    console.log(error)
    return { error: 'login error' }
  }
  revalidatePath('/')
  return {}
}

export async function signup(data: {
  username: string
  email: string
  password: string
  accentColor: string
}): Promise<{ error?: string }> {
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
    console.error(userResponse.error)
    return { error: "signUp() error" }
  }

  revalidatePath('/')
  return {}
}

export async function signOut(): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error(error)
    return { error: 'signOut() error' }
  }
  revalidatePath('/')
  return {}
}
