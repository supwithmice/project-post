import '@mantine/core/styles.css'
import './global.css'
import React from 'react'
import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
  Container,
} from '@mantine/core'
import { theme } from '../theme'
import Header from './components/Header'
import { ModalsProvider } from '@mantine/modals'

export const metadata = {
  title: 'Project Post',
  description: 'I am using Mantine with Next.js!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
            <Header />
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
