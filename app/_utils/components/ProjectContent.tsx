import {
  Card,
  Stack,
  Title,
  Text,
  Accordion,
  Group,
  Button,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Anchor,
} from '@mantine/core'
import { Project } from '../../types'
import Gallery from './Gallery'
import {
  IconDownload,
  IconFile,
  IconFileSpreadsheet,
  IconFileTypeDoc,
  IconFileTypePpt,
  IconFileZip,
  IconPdf,
  IconVideo,
} from '@tabler/icons-react'

export const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith('application/pdf')) {
    return <IconPdf size={20} color="var(--mantine-color-red-6)" />
  }
  if (
    mimeType.startsWith(
      'application/vnd.openxmlformats-officedocument.wordprocessingml'
    )
  ) {
    return <IconFileTypeDoc size={20} color="var(--mantine-color-indigo-6)" />
  }
  if (
    mimeType.startsWith(
      'application/vnd.openxmlformats-officedocument.spreadsheetml'
    )
  ) {
    return (
      <IconFileSpreadsheet size={20} color="var(--mantine-color-green-6)" />
    )
  }
  if (
    mimeType.startsWith(
      'application/vnd.openxmlformats-officedocument.presentationml'
    )
  ) {
    return <IconFileTypePpt size={20} color="var(--mantine-color-orange-6)" />
  }
  if (mimeType.startsWith('video/')) {
    return <IconVideo size={20} color="var(--mantine-color-blue-6)" />
  }
  if (
    mimeType.startsWith('application/zip') ||
    mimeType.startsWith('application/x-zip') ||
    mimeType.startsWith('application/x-tar') ||
    mimeType.startsWith('application/vnd.rar') ||
    mimeType.startsWith('application/x-7z')
  ) {
    return <IconFileZip size={20} color="var(--mantine-color-violet-6)" />
  }
  return <IconFile size={20} />
}

export default function ProjectContent({ project }: { project: Project }) {
  const files = project.files.map((file) => ({
    ...file,
    icon: getFileIcon(file.fileType),
  }))

  return (
    <Stack>
      {project.description && (
        <Card shadow="md">
          <Title order={3} mb="sm">
            Описание
          </Title>
          <Text className='preserveText'>{project.description}</Text>
        </Card>
      )}
      {project.images.length > 0 && (
        <Card shadow="md">
          <Title order={3} mb="md">
            Галерея
          </Title>
          <Gallery images={project.images} />
        </Card>
      )}
      {project.files.length > 0 && (
        <Card shadow="md">
          <Title order={3} mb="md">
            Файлы
          </Title>
          <Accordion>
            {files &&
              files.map((file, index) => (
                <AccordionItem key={index} value={file.fileName}>
                  <AccordionControl icon={file.icon}>
                    {file.fileName}
                  </AccordionControl>
                  <AccordionPanel>
                    <Group justify="flex-end">
                      <Anchor href={file.fileUrl}>
                        <Button variant="outline">Открыть</Button>
                      </Anchor>
                      <Anchor href={file.fileUrl} download>
                        <Button rightSection={<IconDownload size={14} />}>
                          Скачать
                        </Button>
                      </Anchor>
                    </Group>
                  </AccordionPanel>
                </AccordionItem>
              ))}
          </Accordion>
        </Card>
      )}
    </Stack>
  )
}
