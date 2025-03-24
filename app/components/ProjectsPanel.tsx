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
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { Project } from '../types'
import classes from './ProjectsPanel.module.css'
import { sampleProjects } from '../../sampleData'
import ProjectContent from './ProjectContent'
import { useState } from 'react'
import cx from 'clsx'
import { IconEdit } from '@tabler/icons-react'

export default function ProjectsPanel({ id }: { id: number }) {
  const [opened, { toggle, close }] = useDisclosure()
  const [projectOpened, setProjectOpened] = useState(0)

  const projects: Project[] = sampleProjects.filter(
    (value) => value.projectAuthor.id === id
  ) // firebase

  const isMobile = useMediaQuery(`(max-width: ${em(768)})`)
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
          <AppShell.Navbar p="md" pos="absolute" >
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
                    {project.projectName}
                  </Title>
                </Card>
              ))}
            </Stack>
          </AppShell.Navbar>
          <AppShell.Main>
            {isMobile && (
              <Title order={4} size="h2" mb="md">
                {projects[projectOpened].projectName}
              </Title>
            )}
            <ProjectContent project={projects[projectOpened]} />
          </AppShell.Main>
        </>
      )}
    </AppShell>
  )
}
