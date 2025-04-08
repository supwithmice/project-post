'use client'

import { useForm } from '@mantine/form'
import { isFileData, isImage, Project, ProjectSubmit } from '../../types'
import {
  Card,
  Group,
  ActionIcon,
  TextInput,
  Text,
  Button,
  Fieldset,
  FileButton,
  FileInput,
  Grid,
  Stack,
  Textarea,
  LoadingOverlay,
  Anchor,
} from '@mantine/core'
import { IconPhoto, IconTrash, IconUpload } from '@tabler/icons-react'
import { getFileIcon } from './ProjectContent'
import { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import { submitProject } from '../../create/actions'

// here lies new hell, better and worse at the same time

export default function ProjectEditor({
  submitText,
  initialProject,
  otherActions,
  doOnSubmit,
  onEdit,
}: {
  submitText: string
  initialProject?: Project
  otherActions?: React.ReactNode[]
  doOnSubmit: 'submit' | 'edit'
  onEdit?: (project: ProjectSubmit) => void
}) {
  const oldBannerUrl =
    initialProject && initialProject.bannerUrl
      ? initialProject.bannerUrl
      : undefined

  // this is ass refactoring
  // me one week later: yeah this whole thing is ass you idiot what were you thinking
  async function submit(project: ProjectSubmit) {
    const { uid, error } = await submitProject(project)
    if (error) {
      console.error(error)
      redirect('/error')
    }
    redirect(`/projects/${uid}`)
  }

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  async function handleSubmit(project: ProjectSubmit) {
    setLoading(true)
    if (doOnSubmit === 'submit') {
      submit(project)
    }
    if (doOnSubmit === 'edit' && onEdit) {
      onEdit(project)
    }
  }

  // root form
  const form = useForm<ProjectSubmit>({
    mode: 'uncontrolled',
    validateInputOnBlur: true,
    initialValues: initialProject
      ? {
          ...initialProject, 
          description: initialProject.description ? initialProject.description : undefined,
          banner: undefined
        }
      : {
          name: '',
          briefDescription: '',
          description: '',
          images: [],
          files: [],
          banner: undefined,
        },
    validate: {
      name: (value) =>
        value.trim().length === 0 ? 'Введите имя проекта' : null,
      briefDescription: (value) =>
        value.trim().length === 0 ? 'Введите краткое описание' : null,
    },
  })

  // images
  const images = form.getValues().images.map((image, index) => (
    <Card key={index} p="sm">
      <Group justify="space-between">
        <Group gap="xs">
          <IconPhoto size={20} />
          <Text lineClamp={1}>
            {isImage(image) ? image.imageUrl.split('/').pop() : image.file.name}
          </Text>
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
    const newImages: any = form.getValues().images.toSpliced(index, 1)
    form.setFieldValue('images', newImages)
  }

  const handleImages = (files: File[]): void => {
    const newImages: any = files.map((file) => {
      return { file: file, description: '' }
    })
    form.setFieldValue('images', [...form.getValues().images, ...newImages])
  }

  // files
  const files = form.getValues().files.map((file, index) => (
    <Card key={index + 10000} p="sm">
      <Group justify="space-between">
        <Group gap="xs">
          {getFileIcon(isFileData(file) ? file.fileType : file.type)}
          <Text lineClamp={1}>
            {isFileData(file) ? file.fileName : file.name}
          </Text>
        </Group>
        <ActionIcon
          variant="subtle"
          size="md"
          aria-label="Удалить"
          onClick={() => deleteFile(index)}
          disabled={loading}
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
    const newFiles: any = [...files]
    form.setFieldValue('files', [...form.getValues().files, ...newFiles])
  }

  if (loading) {
    return (
      <LoadingOverlay
        visible={true}
        zIndex={900}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ type: 'bars' }}
      />
    )
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Grid>
        <Grid.Col span={{ base: 12, lg: 6 }} h="100%">
          <Fieldset legend="Данные проекта">
            <Stack>
              <TextInput
                disabled={loading}
                withAsterisk
                label="Имя проекта"
                // placeholder="Лучший проект в мире" // cringe
                {...form.getInputProps('name')}
              />
              <Textarea
                disabled={loading}
                withAsterisk
                autosize
                minRows={2}
                label="Краткое описание"
                description="Это описание будет указано на карточке проекта в каталоге"
                {...form.getInputProps('briefDescription')}
              />
              <Textarea
                disabled={loading}
                autosize
                minRows={4}
                label="Подробное описание"
                description="Это описание будет указано на странице проекта"
                {...form.getInputProps('description')}
              />
              <Stack gap={0}>
                <FileInput
                  disabled={loading}
                  label="Баннер"
                  description="Изображение на карточке проекта в каталоге"
                  accept="image/png,image/jpeg"
                  {...form.getInputProps('banner')}
                />
                {oldBannerUrl && (
                  <Anchor fz="sm" href={oldBannerUrl}>
                    Текущий баннер
                  </Anchor>
                )}
              </Stack>
            </Stack>
          </Fieldset>
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Fieldset legend="Фото" mb="md">
            <Stack>
              {images}
              <Group justify="center">
                <FileButton
                  disabled={loading}
                  onChange={handleImages}
                  accept="image/png,image/jpeg"
                  multiple
                >
                  {/* now looking at it, i have no idea wtf this is */}
                  {(props) => (
                    <ActionIcon
                      variant="light"
                      size="lg"
                      disabled={loading}
                      {...props}
                    >
                      <IconUpload />
                    </ActionIcon>
                  )}
                </FileButton>
              </Group>
            </Stack>
          </Fieldset>
          <Fieldset legend="Другие файлы">
            <Text fz="xs" c="gray">
              Максимальный размер файла 50МБ
            </Text>
            <Stack>
              {files}
              <Group justify="center">
                <FileButton disabled={loading} onChange={handleFiles} multiple>
                  {(props) => (
                    <ActionIcon
                      variant="light"
                      size="lg"
                      disabled={loading}
                      {...props}
                    >
                      <IconUpload />
                    </ActionIcon>
                  )}
                </FileButton>
              </Group>
            </Stack>
          </Fieldset>
        </Grid.Col>
      </Grid>
      <Group justify="flex-end" mt="lg">
        {otherActions && otherActions.length > 0 && otherActions}
        <Button type="submit" disabled={loading}>
          {submitText}
        </Button>
      </Group>
    </form>
  )
}
