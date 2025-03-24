import { Card, CardSection, GridCol, Text, Title } from '@mantine/core'
import { Project } from '../types'
import Link from 'next/link'
import classes from './ProjectCard.module.css'
import NextImage from './NextImage'


export default function ProjectCard({ project }: { project: Project }) {

  return (
    <GridCol span={{ base: 12, sm: 6, md: 4 }} >
      <Card h='100%' classNames={{root: classes.cardRoot}} component={Link} href={`/projects/${project.id}`} shadow="md">
        <CardSection>
          <NextImage src={project.bannerUrl} alt='Banner image' />
        </CardSection>
        <Title classNames={{root: classes.title}} order={3} my='sm' lineClamp={2}>{project.projectName}</Title>
        <Text lineClamp={4}>
          {project.projectBriefDescription}
        </Text>
      </Card>
    </GridCol>
  )
}
