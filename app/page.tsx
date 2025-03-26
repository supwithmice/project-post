import { Box, Grid, Title } from '@mantine/core'
import ProjectCard from './_utils/components/ProjectCard'
import { fetchProjects } from './projects/actions'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const { data, error } = await fetchProjects()
  if (error) {
    redirect('/error')
  }
  if (!data || data.length === 0) {
    return (
      <Box className='pageCenter'>
        <Title size="h3" order={2} my="md" textWrap="nowrap">
          Нет проектов
        </Title>
      </Box>
    )
  }

  return (
    <>
      {/* <GoogleOneTap /> */}
      <Title order={2} ml="sm">
        Каталог проектов
      </Title>
      <Grid gutter={{ base: 'sm', sm: 'md', lg: 'xl' }} my="md">
        {data &&
          data.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
      </Grid>
    </>
  )
}
