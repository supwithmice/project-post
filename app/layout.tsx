import '@mantine/core/styles.css'
import './global.css'
import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
  Container,
} from '@mantine/core'
import { theme } from '../theme'
import Header from './_utils/components/header/Header'
import { ModalsProvider } from '@mantine/modals'
import AccountActions from './_utils/components/header/AccountActions'
import { createClient } from './_utils/supabase/server'

export const metadata = {
  title: 'Project Post',
  description: 'I am using Mantine with Next.js!',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const content = lazy()

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <html lang="ru" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <ModalsProvider>
            <Header actions={<AccountActions user={user} />} />
            <Container mt="md" maw="1400px">
              {children}
            </Container>
            {/* <Footer/> */}
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  )
}
