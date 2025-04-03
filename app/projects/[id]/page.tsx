import {
  Title,
  Avatar,
  Stack,
  Badge,
  GridCol,
  Grid,
  Card,
  Text,
} from '@mantine/core'
import classes from './page.module.css'
import NextImage from '../../_utils/components/NextImage'
import ProjectContent from '../../_utils/components/ProjectContent'
import NotFound from '../../not-found'
import { fetchProjectById } from '../actions'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { createClient } from '../../_utils/supabase/server'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select(`name,brief_description`)
    .eq('project_uuid', id)
    .single()

  if (error) {
    return { title: 'Страница проекта' }
  }

  return {
    title: data.name,
    description: data.brief_description,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  const { data, error } = await fetchProjectById(id)
  if (error) {
    console.error(error)
    redirect('/error')
  }
  if (!data) {
    return <NotFound text="Такого проекта не существует" />
  }
  return (
    <Grid gutter={{ base: 'sm', sm: 'lg' }}>
      <GridCol span={{ base: 12, sm: 4 }}>
        <Card shadow="md">
          <Stack gap="md">
            <Stack m="0" gap="sm">
              <Title order={2}>{data.name}</Title>
              <Badge
                color={data.authorAccount.accentColor}
                // component={Link}
                // href={`/account/${project.projectAuthor.id}`} // removed public account pages
                leftSection={
                  <Avatar
                    color={data.authorAccount.accentColor}
                    name={data.authorAccount.username}
                  />
                }
                size="xl"
                variant="outline"
                pr="sm"
                classNames={{ root: classes.badgeRoot }}
              >
                {data.authorAccount.username}
              </Badge>
              <Text>{data.briefDescription}</Text>
              {data.bannerUrl && (
                <NextImage
                  src={data.bannerUrl}
                  alt="Banner image"
                  radius="md"
                />
              )}
            </Stack>
          </Stack>
        </Card>
      </GridCol>
      <GridCol span={{ base: 12, sm: 8 }}>
        <ProjectContent project={data} />
      </GridCol>
    </Grid>
  )
}
