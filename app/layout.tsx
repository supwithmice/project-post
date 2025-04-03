import '@mantine/core/styles.css'
import './global.css'
import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
  Container,
  DEFAULT_THEME,
  createTheme,
} from '@mantine/core'
import Header from './_utils/components/header/Header'
import { ModalsProvider } from '@mantine/modals'
import AccountActions from './_utils/components/header/AccountActions'
import { createClient } from './_utils/supabase/server'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Post',
  description: 'Домашняя страница Project Post',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let primaryColor: string
  if (user) {
    const hex = user.user_metadata.accent_color
    const colorMap = Object.fromEntries(
      [
        'red',
        'pink',
        'grape',
        'violet',
        'indigo',
        'blue',
        'cyan',
        'teal',
        'green',
        'lime',
        'yellow',
        'orange',
      ].map((color) => [DEFAULT_THEME.colors[color][6], color])
    )
    primaryColor = colorMap[hex]
  } else {
    primaryColor = 'violet'
  }

  const theme = createTheme({
    /* Put your mantine theme override here */
    defaultRadius: 'md',
    primaryColor: primaryColor,
    autoContrast: true,
  })

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
