import { Stack, Title } from '@mantine/core'
import ProjectEditor from '../_utils/components/ProjectEditor'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Post | Создать Проект',
  description: 'Страница создания проекта на Project Post',
}

// welcome to hell, again
// edit: hell was moved to ProjectEditor.tsx

export default function CreatePage() {
  return (
    <Stack>
      <Title order={2}>Создание проекта</Title>
      <ProjectEditor
        submitText="Загрузить проект"
        doOnSubmit='submit'
      />
    </Stack>
  )
}
