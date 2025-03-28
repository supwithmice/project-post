'use client'

import { Button, Card, Group, Stack, Text, Title } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconTrash } from '@tabler/icons-react'
import { redirect } from 'next/navigation'
import { deleteAccount } from './actions'
import { Project } from '../types'

export default function AccountActions({
  projects,
}: {
  projects: Project[]
}) {
  // account deletion
  const openDeleteAccountModal = () =>
    modals.openConfirmModal({
      title: 'Удалить аккаунт',
      centered: true,
      zIndex: 1100,
      removeScrollProps: { removeScrollBar: false },
      children: <Text size="sm">Вы точно хотите удалить этот аккаунт? Это удалит все ваши проекты на сайте.</Text>,
      confirmProps: { color: 'red' },
      labels: { cancel: 'Отмена', confirm: 'Удалить' },
      onConfirm: async () => {
        const { error } = await deleteAccount(projects)
        if (error) {
          console.error(error)
          redirect('/error')
        }
        redirect('/')
      },
    })

  return (
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
  )
}
