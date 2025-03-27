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
import { Project, ProjectSubmit } from '../../types'
import classes from './ProjectsPanel.module.css'
import ProjectContent from './ProjectContent'
import { useState } from 'react'
import cx from 'clsx'
import { IconEdit } from '@tabler/icons-react'
import { editProject } from '../../account/actions'
import { modals } from '@mantine/modals'
import ProjectEditor from './ProjectEditor'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export default function ProjectsPanel({ projects }: { projects: Project[] }) {
  const [opened, { toggle, close }] = useDisclosure()
  const [projectOpened, setProjectOpened] = useState(0)

  const isProjects = projects.length > 0

  const handleEdit = async (uid: string, newProject: ProjectSubmit) => {
    const { error } = await editProject(uid, newProject)
    if (error) {
      console.error(error)
      redirect('/error')
    }
    revalidatePath('/account')
    modals.closeAll()
    redirect('/account')
  }

  const openEditModal = (project: Project) => {
    modals.open({
      title: `Редактировать проект`,
      centered: true,
      children: (
        <ProjectEditor
          submitText="Сохранить"
          onSubmit={(newProject) => handleEdit(project.id, newProject)}
          otherActions={[
            <Button variant="light" onClick={modals.closeAll}>
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
