'use client'

import {
  Button,
  ActionIcon,
  Menu,
  Avatar,
  Badge,
  MenuDivider,
  MenuDropdown,
  MenuItem,
  MenuTarget,
} from '@mantine/core'
import { IconPlus, IconUser, IconLogout } from '@tabler/icons-react'
import Link from 'next/link'
import classes from './AccountActions.module.css'
import { signOut } from '../../../(auth)/login/actions'
import { redirect } from 'next/navigation'
import { User } from '@supabase/supabase-js'

export default function AccountActions({user}: {user: User | null}) {

  if (!user) {
    return (
      <Button component={Link} href="/login">
        Войти
      </Button>
    )
  } else {
    async function handleSignout() {
      await signOut()
      redirect('/')
    }

    return (
      <>
      {/* create project */}
        <ActionIcon
          component={Link}
          href="/create"
          size="lg"
          classNames={{ root: classes.mobileIcon }}
        >
          <IconPlus />
        </ActionIcon>
        <Button
          component={Link}
          href="/create"
          classNames={{ root: classes.desktopIcon }}
        >
          Создать проект
        </Button>
      {/* account */}
        <Menu shadow="md" width={200} zIndex={1100}>
          <MenuTarget>
            <Avatar
              radius="xl"
              classNames={{ root: classes.mantineAvatarRoot }}
              color={user.user_metadata.accent_color}
              name={user.user_metadata.username}
            ></Avatar>
          </MenuTarget>
          <MenuDropdown>
            <Badge
              color={user.user_metadata.accentColor}
              size="md"
              fullWidth
              my="5"
              variant="outline"
              pr="sm"
            >
              {user.user_metadata.username}
            </Badge>
            <MenuItem
              leftSection={<IconUser size={14} />}
              component={Link}
              href={`/account`}
            >
              Мой аккаунт
            </MenuItem>
            <MenuDivider />
            <MenuItem
              color="red"
              leftSection={<IconLogout size={14} />}
              onClick={handleSignout}
            >
              Выйти
            </MenuItem>
          </MenuDropdown>
        </Menu>
      </>
    )
  }
}
