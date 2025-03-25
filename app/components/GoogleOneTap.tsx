'use client'

import Script from 'next/script'
import { createClient } from '../utils/supabase/client'
import { CredentialResponse } from 'google-one-tap'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Group } from '@mantine/core'

export default function GoogleOneTap() {
  const supabase = createClient()
  const router = useRouter()

  // generate nonce to use for google id token sign-in
  const generateNonce = async (): Promise<string[]> => {
    const nonce = btoa(
      String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32)))
    )
    const encoder = new TextEncoder()
    const encodedNonce = encoder.encode(nonce)
    const hashBuffer = await crypto.subtle.digest('SHA-256', encodedNonce)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashedNonce = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')

    return [nonce, hashedNonce]
  }

  useEffect(() => {
    const initializeGoogleOneTap = async () => {
      console.log('Initializing Google One Tap')
      try {
        // Check if Google API is available
        if (!window.google || !window.google.accounts) {
          console.error('Google API not loaded')
          return
        }

        const [nonce, hashedNonce] = await generateNonce()
        console.log('Nonce: ', nonce, hashedNonce)

        // Check if there's already an existing session
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error getting session', error)
          return
        }
        if (data.session) {
          router.push('/')
          return
        }

        /* global google */
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: async (response: CredentialResponse) => {
            try {
              // send id token returned in response.credential to supabase

              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: response.credential,
                nonce,
              })

              if (error) throw error
              console.log('Session data: ', data)
              console.log('Successfully logged in with Google One Tap')

              // redirect to protected page
              router.push('/')
            } catch (error) {
              console.error('Error logging in with Google One Tap', error)
            }
          },
          nonce: hashedNonce,
          // with chrome's removal of third-party cookiesm, we need to use FedCM instead (https://developers.google.com/identity/gsi/web/guides/fedcm-migration)
          use_fedcm_for_prompt: true,
        })
        window.google.accounts.id.prompt() // Display the One Tap UI
      } catch (error) {
        console.error('Error initializing Google One Tap', error)
      }
    }
    initializeGoogleOneTap()
  }, [router, supabase.auth])

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="beforeInteractive"
        onLoad={() => console.log('Google API loaded')}
        onError={() => console.error('Failed to load Google API')}
      />
      <Group id="oneTap" pos="fixed" top={0} right={0} />
    </>
  )
}
