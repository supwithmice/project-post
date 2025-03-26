import { Stack, Title } from '@mantine/core'
import NextImage from './_utils/components/NextImage'
import NotFoundSvg from './_utils/res/not-found.svg'

export default function NotFound({ text }: { text?: string }) {
  return (
    <Stack className='pageCenter' miw='30vw' align='center'>
      <NextImage
        src={NotFoundSvg}
        alt="404"
        aspectRatio="1"
        classNames={{ root: 'notFound' }}
      />
      <Title size="h3" order={2} my="md" textWrap="nowrap">
        {text ? text : 'Страница не найдена'}
      </Title>
    </Stack>
  )
}
