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
  em,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Project } from '../../types'
import classes from './ProjectsPanel.module.css'
import ProjectContent from './ProjectContent'
import { useState } from 'react'
import cx from 'clsx'
import { IconEdit } from '@tabler/icons-react'

export default function ProjectsPanel({ projects }: { projects: Project[] }) {
  const [opened, { toggle, close }] = useDisclosure()
  const [projectOpened, setProjectOpened] = useState(0)

  const isProjects = projects.length > 0
  const isProjectsMultiple = projects.length > 1

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
          {isProjectsMultiple && (
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          )}
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
                  {/* TODO: onClick */}
                  <ActionIcon
                    pos="absolute"
                    top="10px"
                    right="10px"
                    size="sm"
                    variant="light"
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
