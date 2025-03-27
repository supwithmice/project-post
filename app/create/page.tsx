'use client'

import { Stack, Title } from '@mantine/core'

import ProjectEditor from '../_utils/components/ProjectEditor'
import { ProjectSubmit } from '../types'
import { submitProject } from './actions'
import { redirect } from 'next/navigation'

// welcome to hell, again
// edit: hell was moved to ProjectEdit.tsx

export default function CreatePage() {
  async function onSubmit(project: ProjectSubmit) {
    const { uid, error, errorType } = await submitProject(project)
    if (error) {
      console.error(error, errorType)
      redirect('/error')
    }
    redirect(`/projects/${uid}`)
  }

  return (
    <Stack>
      <Title order={2}>Создание проекта</Title>
      <ProjectEditor
        submitText="Загрузить проект"
        onSubmit={onSubmit}
      />
    </Stack>
  )
}
