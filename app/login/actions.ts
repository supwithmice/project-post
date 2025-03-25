'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../utils/supabase/server'
import {
  AuthError,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/auth-js'

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
}): Promise<{ error: AuthError | null }> {
  const supabase = await createClient()

  const user: SignUpWithPasswordCredentials = {
    email: data.email,
    password: data.password,
    options: {
      data: {
        accentColor: data.accentColor,
        username: data.username,
      },
    },
  }

  const { error } = await supabase.auth.signUp(user)

  if (error) {
    return { error: error }
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
