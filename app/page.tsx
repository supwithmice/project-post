import { Grid, Title } from '@mantine/core'
import { sampleProjects } from '../sampleData'
import { Project } from './types'
import ProjectCard from './components/ProjectCard'

export default function HomePage() {
  const data = [...sampleProjects, ...sampleProjects]

  return (
    <>
        <Title order={2} ml='sm'>
          Каталог проектов
        </Title>
        <Grid gutter={{ base: 'sm', sm: 'md', lg: 'xl' }} my='md'>
          {data &&
            data.map((project, index) => <ProjectCard key={index} project={project} />)}
        </Grid>
    </>
  )
}
 