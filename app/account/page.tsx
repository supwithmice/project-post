import { GridCol, Grid } from '@mantine/core'
import { fetchUserAndProjects } from './actions'
import { redirect } from 'next/navigation'
import Metadata from './Metadata'
import AccountActions from './AccountActions'
import ProjectsPanel from './ProjectsPanel'

export default async function AccountPage() {
  const { error, user, projects } = await fetchUserAndProjects()
  if (error || !user || !projects) {
    redirect('/error')
  }

  return (
    <>
      <Grid gutter={{ base: 'sm', sm: 'lg' }} mb="sm">
        <GridCol span={{ base: 12, sm: 4 }}>
          <Metadata user={user} />
        </GridCol>
        <GridCol span={{ base: 12, sm: 8 }}>
          <AccountActions projects={projects}/>
        </GridCol>
      </Grid>
      <ProjectsPanel projects={projects} />
    </>
  )
}
