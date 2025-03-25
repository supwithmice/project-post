import {
  Title,
  Text,
  Avatar,
  Stack,
  GridCol,
  Grid,
  Group,
  Card,
  ActionIcon,
} from '@mantine/core'
import ProjectsPanel from '../components/ProjectsPanel'
import { IconEdit } from '@tabler/icons-react'
import classes from './page.module.css'
import { createClient } from '../utils/supabase/server'
import { redirect } from 'next/navigation'


export default async function AccountPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  const user = data.user

  return (
    <>
      <Grid gutter={{ base: 'sm', sm: 'lg' }} mb="sm">
        <GridCol span={{ base: 12, sm: 4 }}>
          <Card h="100%" shadow="md">
            TODO onClick
            <ActionIcon classNames={{root: classes.editRoot}} variant='light' ><IconEdit/></ActionIcon>
            <Stack gap="md" align="flex-start">
              <Title order={2}>Аккаунт</Title>
              <Group align="center">
                <Avatar
                  color={user.user_metadata?.accentColor}
                  name={user.user_metadata?.username}
                  size="lg"
                />
                <Text fs="md">{user.user_metadata?.username}</Text>
              </Group>
            </Stack>
          </Card>
        </GridCol>
        <GridCol span={{ base: 12, sm: 8 }}>
          <Card h="100%" shadow="md">
            <Stack>
              <Title order={3}>Об аккаунте</Title>
              <Text>stuff and stuff and stuff and stuff and </Text>
            </Stack>
          </Card>
        </GridCol>
      </Grid>
        <ProjectsPanel id={user.id} />
    </>
  )
}
