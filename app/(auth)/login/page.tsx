import { Card, Flex } from '@mantine/core'
import LoginForm from './LoginForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Post | Вход',
  description: 'Страница входа и регистрации на Project Post',
}

export default function LoginPage() {
  return (
    <Flex justify="center" align="center" h="75vh">
      <Card shadow="md" w="100%" maw="400" py="lg">
        <LoginForm />
      </Card>
    </Flex>
  )
}
