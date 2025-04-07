'use client'

import {
  AppShell,
  Burger,
  Group,
  Title,
  Text,
  Card,
  Stack,
  ActionIcon,
  Button,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Project, ProjectSubmit } from '../types'
import classes from './ProjectsPanel.module.css'
import ProjectContent from '../_utils/components/ProjectContent'
import { useState } from 'react'
import cx from 'clsx'
import { IconEdit } from '@tabler/icons-react'
import { deleteProject, editProject } from './actions'
import { modals } from '@mantine/modals'
import ProjectEditor from '../_utils/components/ProjectEditor'
import { redirect } from 'next/navigation'

export default function ProjectsPanel({ projects }: { projects: Project[] }) {
  const [opened, { toggle, close }] = useDisclosure()
  const [projectOpened, setProjectOpened] = useState(0)

  const isProjects = projects.length > 0

  async function handleEdit(oldProject: Project, newProject: ProjectSubmit){
      const { error } = await editProject(oldProject.id, newProject, oldProject.bannerUrl)
      if (error) {
        console.error(error)
        redirect('/error')
      }
      modals.closeAll()
    }

  const openEditModal = (project: Project) => {
    modals.open({
      title: `Редактировать проект`,
      centered: true,
      fullScreen: true,
      zIndex: 1100,
      children: (
        <ProjectEditor
          submitText="Сохранить"
          doOnSubmit='edit'
          onEdit={(newProject) => handleEdit(project, newProject)}
          otherActions={[
            <Button
            key={1}
              color="red"
              onClick={() => {
                modals.openConfirmModal({
                  title: 'Удалить проект',
                  centered: true,
                  zIndex: 1200,
                  removeScrollProps: { removeScrollBar: false },
                  children: (
                    <Text size="sm">Вы точно хотите удалить этот проект?</Text>
                  ),
                  confirmProps: { color: 'red' },
                  labels: { cancel: 'Отмена', confirm: 'Удалить' },
                  onConfirm: async () => {
                    const { error } = await deleteProject(project.id)
                    if (error) {
                      console.error(error)
                      redirect('/error')
                    }
                    setProjectOpened(0)
                    modals.closeAll()
                  },
                })
              }}
            >
              Удалить проект
            </Button>,
            <Button key={2} variant="light" onClick={modals.closeAll}>
              Отмена
            </Button>,
          ]}
          initialValues={{
            // look, i'm almost done with this project. i'll just make a workaround for images and files, then call it a day
            ...project,
            description: project.description ? project.description : undefined,
            banner: project.bannerUrl ? project.bannerUrl : undefined,
          }}
        />
      ),
    })
  }

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={
        isProjects
          ? { width: 210, breakpoint: 'sm', collapsed: { mobile: !opened } }
          : undefined
      }
      padding="md"
      pos="relative"
    >
      <AppShell.Header pos="absolute">
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

          <Title order={3}>Проекты</Title>
        </Group>
      </AppShell.Header>
      {!isProjects && (
        <AppShell.Main>
          <Text>У вас нет проектов</Text>
        </AppShell.Main>
      )}
      {isProjects && (
        <>
          <AppShell.Navbar p="md" pos="absolute">
            <Stack>
              {projects.map((project, index) => (
                <Card
                  classNames={{
                    root: cx(
                      classes.cardRoot,
                      projectOpened === index && classes.cardOpened
                    ),
                  }}
                  shadow="md"
                  key={index}
                  onClick={() => {
                    setProjectOpened(index)
                    close()
                  }}
                >
                  <ActionIcon
                    pos="absolute"
                    top="10px"
                    right="10px"
                    size="sm"
                    variant="light"
                    onClick={() => openEditModal(project)}
                  >
                    <IconEdit />
                  </ActionIcon>
                  <Title order={4} lineClamp={3} mr="18px">
                    {project.name}
                  </Title>
                </Card>
              ))}
            </Stack>
          </AppShell.Navbar>
          <AppShell.Main>
            <Title order={4} size="h2" mb="md" hiddenFrom="sm">
              {projects[projectOpened].name}
            </Title>

            <ProjectContent project={projects[projectOpened]} />
          </AppShell.Main>
        </>
      )}
    </AppShell>
  )
}
