'use client'

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
  Button,
  LoadingOverlay,
  TextInput,
} from '@mantine/core'
import ProjectsPanel from '../_utils/components/ProjectsPanel'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import classes from './page.module.css'
import { changeName, deleteAccount, fetchUserProjects } from './actions'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { Project } from '../types'
import { modals } from '@mantine/modals'
import { useField } from '@mantine/form'

export default function AccountPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [projects, setProjects] = useState<Project[] | null>(null)

  // account deletion
  const openDeleteAccountModal = () =>
    modals.openConfirmModal({
      title: 'Вы точно хотите удалить этот аккаунт?',
      centered: true,
      removeScrollProps: { removeScrollBar: false },
      children: <Text size="sm">Это удалит все ваши проекты на сайте.</Text>,
      confirmProps: { color: 'red' },
      labels: { cancel: 'Отмена', confirm: 'Удалить' },
      onConfirm: async () => {
        setLoading(true) 
        const {error} = await deleteAccount(user!, projects!)
        if (error){
          console.error(error)
          redirect('/error')
        }
        redirect('/')
      },
    })

  // renaming
  const name = useField({
    mode: 'uncontrolled',
    initialValue: '',
    validateOnBlur: true,
    validate: (value) => (value.trim().length < 1 ? 'Введите имя' : null),
  })

  const handleNameChange = async () => {
    const error = await name.validate()
    if (error) name.setError(error)
    else {
      setLoading(true)
      modals.closeAll()
      changeName(user!, name.getValue())
    }
  }

  const openRenameModel = () =>
    modals.open({
      title: 'Сменить имя аккаунта',
      centered: true,
      children: (
        <>
          <TextInput
            {...name.getInputProps()}
            label="Новое имя"
            placeholder="ballcrusher123"
            data-autofocus
          />
          <Button fullWidth onClick={handleNameChange} mt="md">
            Submit
          </Button>
        </>
      ),
      onClose: name.reset,
    })

  // data fetching
  useEffect(() => {
    const load = async () => {
      const { error, user, projects } = await fetchUserProjects()
      if (error || !user) {
        console.error(error)
        redirect('/error')
      }
      setUser(user)
      setProjects(projects ? projects : [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <LoadingOverlay
        visible={true}
        zIndex={900}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ type: 'bars' }}
      />
    )
  } else {
    return (
      <>
        <Grid gutter={{ base: 'sm', sm: 'lg' }} mb="sm">
          <GridCol span={{ base: 12, sm: 4 }}>
            <Card h="100%" shadow="md">
              <ActionIcon
                classNames={{ root: classes.editRoot }}
                variant="light"
                onClick={openRenameModel}
              >
                <IconEdit />
              </ActionIcon>
              <Stack gap="md" align="flex-start">
                <Title order={2}>Аккаунт</Title>
                <Group align="center">
                  <Avatar
                    color={user!.user_metadata.accent_color}
                    name={user!.user_metadata.username}
                    size="lg"
                  />
                  <Text fz="h3" fw="500">
                    {user!.user_metadata?.username}
                  </Text>
                </Group>
              </Stack>
            </Card>
          </GridCol>
          <GridCol span={{ base: 12, sm: 8 }}>
            <Card h="100%" shadow="md">
              <Stack>
                <Title order={3}>Действия</Title>
                <Group justify="end">
                  <Button
                    color="red"
                    leftSection={<IconTrash size={16} />}
                    onClick={openDeleteAccountModal}
                  >
                    Удалить аккаунт
                  </Button>
                </Group>
              </Stack>
            </Card>
          </GridCol>
        </Grid>
        <ProjectsPanel projects={projects!} />
      </>
    )
  }
}
