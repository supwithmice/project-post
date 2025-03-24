'use client'

import {
  Fieldset,
  Grid,
  Group,
  Stack,
  Textarea,
  TextInput,
  Text,
  Title,
  ActionIcon,
  Button,
  Card,
  FileButton,
} from '@mantine/core'

import { useForm } from '@mantine/form'
import { IconPhoto, IconTrash, IconUpload } from '@tabler/icons-react'
import { getFileIcon } from '../components/ProjectContent'
import { submitProject } from '../util/Functions'

// welcome to hell, again

export type ProjectSubmit = {
  projectName: string
  projectBriefDescription: string
  projectDescription: string
  images: {
    file: File
    description: string
  }[],
  files: File[]
}

export default function CreatePage() {
  // TODO: check if logged in

  async function handleSubmit(project: ProjectSubmit) {
    // submitProject(project)
  }

  const form = useForm<ProjectSubmit>({
    mode: 'uncontrolled',
    initialValues: {
      projectName: '',
      projectBriefDescription: '',
      projectDescription: '',
      images: [],
      files: []
    },
    validate: {
      projectName: (value) => (value.length < 1 ? 'Введите имя проекта' : null),
    },

  })

  const images = form.getValues().images.map((image, index) => (
    <Card key={index} p="sm">
      <Group justify="space-between">
        <Group gap='xs'>

        <IconPhoto size={20} />
        <Text lineClamp={1}>{image.file.name}</Text>
        </Group>
        <ActionIcon
          variant="subtle"
          size="md"
          aria-label="Удалить"
          onClick={() => deleteImage(index)}
          >
          <IconTrash size={18} />
        </ActionIcon>
      </Group>
      <TextInput
        label="Описание"
        key={form.key(`images.${index}.description`)}
        ></TextInput>
    </Card>
  ))

  const deleteImage = (index: number) => {
    const newImages = form.getValues().images.toSpliced(index, 1)
    form.setFieldValue('images', newImages)
  }

  const handleImages = (files: File[]): void => {
    const newFiles = files.map((file) => {
      return { file: file, description: '' }
    })
    form.setFieldValue('images', [...form.getValues().images, ...newFiles])
  }

  
  const files = form.getValues().files.map((file, index) => (
    <Card key={index} p="sm">
      <Group justify="space-between">
        <Group gap='xs'>
        {getFileIcon(file.type)}
        <Text lineClamp={1}>{file.name}</Text>

        </Group>
        <ActionIcon
          variant="subtle"
          size="md"
          aria-label="Удалить"
          onClick={() => deleteFile(index)}
        >
          <IconTrash size={18} />
        </ActionIcon>
      </Group>
    </Card>
  ))

  const deleteFile = (index: number) => {
    const newFiles = form.getValues().files.toSpliced(index, 1)
    form.setFieldValue('files', newFiles)
  }

  const handleFiles = (files: File[]) => {
    form.setFieldValue('files', [...form.getValues().files, ...files])
  }
  return (
    <Stack>
      <Title order={2}>Создание проекта</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={{ base: 12, lg: 6 }} h="100%">
            <Fieldset legend="Данные проекта">
              <Stack>
                <TextInput
                  withAsterisk
                  label="Имя проекта"
                  placeholder="Лучший проект в мире"
                  {...form.getInputProps('projectName')}
                />
                <Textarea
                  autosize
                  minRows={2}
                  label="Краткое описание"
                  description="Это описание будет указано на карточке проекта в каталоге"
                  {...form.getInputProps('projectBriefDescription')}
                />
                <Textarea
                  autosize
                  minRows={4}
                  label="Подробное описание"
                  description="Это описание будет указано на странице проекта"
                  {...form.getInputProps('projectDescription')}
                />
              </Stack>
            </Fieldset>
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Fieldset legend="Фото" mb='md'>
              <Stack>
                {images}
                <Group justify="center">
                  <FileButton
                    onChange={handleImages}
                    accept="image/png,image/jpeg"
                    multiple
                  >
                    {(props) => <ActionIcon variant='light' size='lg' {...props}><IconUpload/></ActionIcon>}
                  </FileButton>
                </Group>
              </Stack>
            </Fieldset>
            <Fieldset legend="Другие файлы">
              <Stack>
                {files}
                <Group justify="center">
                  <FileButton
                    onChange={handleFiles}
                    // accept=""
                    multiple
                  >
                    {(props) => <ActionIcon variant='light' size='lg'  {...props}><IconUpload/></ActionIcon>}
                  </FileButton>
                </Group>
              </Stack>
            </Fieldset>
          </Grid.Col>
        </Grid>
        <Group justify='flex-end' mt='lg'><Button type="submit">Загрузить проект</Button></Group>
      </form>
    </Stack>
  )
}
