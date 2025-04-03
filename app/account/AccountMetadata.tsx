'use client'

import { modals } from '@mantine/modals'
import { User } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { changeMetadata } from './actions'
import {
  Group,
  Avatar,
  Text,
  ActionIcon,
  Card,
  Stack,
  Title,
  Button,
  ColorInput,
  DEFAULT_THEME,
  TextInput,
} from '@mantine/core'
import { IconEdit } from '@tabler/icons-react'
import { useForm } from '@mantine/form'
import classes from './AccountMetadata.module.css'

export default function AccountMetadata({ user }: { user: User }) {
  const [loading, setLoading] = useState(false)

  const handleMetadata = async (values: { name: string; color: string }) => {
    setLoading(true)
    const res = await changeMetadata(values.name, values.color)
    if (res.error) {
      console.error(res.error)
      redirect('/error')
    }
    modals.closeAll()
    setLoading(false)
  }

  const openMetadataModel = () =>
    modals.open({
      title: 'Изменить данные',
      centered: true,
      removeScrollProps: { removeScrollBar: false },
      zIndex: 1100,
      children: (
        <form onSubmit={metadata.onSubmit((values) => handleMetadata(values))}>
          <TextInput
            label="Имя"
            placeholder="ballcrusher123"
            disabled={loading}
            {...metadata.getInputProps('name')}
          />
          {/* yes i just copied it. what */}
          <ColorInput
            classNames={{ dropdown: classes.colorPicker }}
            disabled={loading}
            withEyeDropper={false}
            // defaultValue={user!.user_metadata.accent_color}
            label="Цвет"
            swatches={[
              'red',
              'pink',
              'grape',
              'violet',
              'indigo',
              'blue',
              'cyan',
              'teal',
              'green',
              'lime',
              'yellow',
              'orange',
            ].map((color) => DEFAULT_THEME.colors[color][6])}
            withPicker={false}
            swatchesPerRow={6}
            disallowInput
            {...metadata.getInputProps('color')}
          />
          <Button fullWidth type="submit" mt="md">
            Сохранить
          </Button>
        </form>
      ),
      onClose: metadata.reset,
    })

  const metadata = useForm<{ name: string; color: string }>({
    mode: 'uncontrolled',
    initialValues: {
      name: user!.user_metadata.username,
      color: user!.user_metadata.accent_color,
    },
    validateInputOnBlur: true,
    validate: {
      name: (value) =>
        !value || value.trim().length < 1 ? 'Введите имя' : null,
    },
  })

  return (
    <Card h="100%" shadow="md">
      <ActionIcon
        classNames={{ root: classes.editRoot }}
        variant="light"
        onClick={openMetadataModel}
      >
        <IconEdit />
      </ActionIcon>
      <Stack gap="md" align="flex-start">
        <Title order={2}>Аккаунт</Title>
        <Group align="center" wrap='nowrap' >
          <Avatar
            color={user.user_metadata.accent_color}
            name={user.user_metadata.username}
            size="lg"
          />
          <Text fz="h3" fw="500" w='100%' lineClamp={2}>
            {user.user_metadata.username}
          </Text>
        </Group>
      </Stack>
    </Card>
  )
}
