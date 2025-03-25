import {
  Flex,
  Title,
  Avatar,
  Stack,
  Badge,
  GridCol,
  Grid,
  Card,
} from '@mantine/core'
import Link from 'next/link'
import NotFound from '../../res/not-found.svg'
import { Project } from '../../types'
import classes from './page.module.css'
import { sampleProjects } from '../../../sampleData'
import NextImage from '../../components/NextImage'
import ProjectContent from '../../components/ProjectContent'

export default async function ProjectPage({
  params,
}: {
  params: Promise<{id: string }>
}) {
  const id = Number((await params).id)
  const project: Project | undefined = isNaN(id)
    ? undefined
    : sampleProjects.find((project) => project.id === id) // get this from database

  if (!project) {
    return (
      <Flex h="80vh" justify="center" align="center" direction="column">
        <NextImage
          src={NotFound}
          alt="Not Found"
          aspectRatio="1"
          classNames={{ root: classes.image }}
        />
        <Title size="h3" order={2} my="md" textWrap="nowrap">
          Такого проекта не существует
        </Title>
      </Flex>
    )
  }
  return (
    <Grid gutter={{ base: 'sm', sm: 'lg' }}>
      <GridCol span={{ base: 12, sm: 4 }}>
        <Card shadow="md">
          <Stack gap="md">
            <Stack m="0" gap="sm">
              <Title order={2}>{project.projectName}</Title>
              <Badge
                color={project.projectAuthor.accentColor}
                // component={Link}
                // href={`/account/${project.projectAuthor.id}`}
                leftSection={
                  <Avatar
                    color={project.projectAuthor.accentColor}
                    name={project.projectAuthor.accountName}
                  />
                }
                size="xl"
                variant="outline"
                pr="sm"
                classNames={{ root: classes.badgeRoot }}
              >
                {project.projectAuthor.accountName}
              </Badge>
              <NextImage
                src={project.bannerUrl}
                alt="Banner image"
                radius="md"
              />
            </Stack>
          </Stack>
        </Card>
      </GridCol>
      <GridCol span={{ base: 12, sm: 8 }}>
        <ProjectContent project={project}/>
      </GridCol>
    </Grid>
  )
}
