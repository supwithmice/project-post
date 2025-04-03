import { Title } from '@mantine/core'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ошибка',
}

export default function ErrorPage() {
  return (
    <Title className="pageCenter" size="h3" order={2} my="md" textWrap="nowrap">
      Что-то пошло не так
    </Title>
  )
}
