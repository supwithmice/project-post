'use client'

import {
  Group,
  NavLink,
  Button,
  Title,
  Avatar,
  Anchor,
  ActionIcon,
  em,
  Burger,
  Drawer,
  Menu,
  Badge,
} from '@mantine/core'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import ThemeSwitcher from './ThemeSwitcher'
import classes from './Header.module.css'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { IconLogout, IconPlus, IconUser } from '@tabler/icons-react'
import { signOut } from '../login/actions'
import { createClient } from '../utils/supabase/client'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'

const navLinkClassNames = {
  root: classes.mantineNavLinkRoot,
  body: classes.mantineNavLinkBody,
}

const links = [
  {
    href: '/',
    label: 'Каталог',
  },
  {
    href: '/about',
    label: 'О проекте',
  },
]

export default function Header() {
  const pathName = usePathname()
  const router = useRouter()
  const [opened, { toggle, close }] = useDisclosure()
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const supabase = createClient()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])


  async function handleSignout() {
    await signOut()
    router.push('/')
  }

  return (
    <>
      <Group h={isMobile ? 60 : 70}></Group>
      <header>
        <Group
          justify="space-between"
          align="center"
          h={isMobile ? 60 : 70}
          px={{ base: 'sm', sm: 'lg' }}
          classNames={{ root: classes.headerRoot }}
        >
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Anchor component={Link} href="/">
              <Title textWrap="nowrap" fz="h3">
                Project Post
              </Title>
            </Anchor>
          </Group>
          <Group
            wrap="nowrap"
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            gap="0"
          >
            {!isMobile &&
              links.map((link, index) => (
                <NavLink
                  key={index}
                  component={Link}
                  href={link.href}
                  active={link.href === pathName}
                  label={link.label}
                  classNames={navLinkClassNames}
                  variant="subtle"
                />
              ))}
          </Group>
          <Group gap={isMobile ? 'xs' : 'md'}>
            {!user && (
              <Button component={Link} href="/login">
                Войти
              </Button>
            )}
            {user && (
              <>
                {isMobile ? (
                  <ActionIcon component={Link} href="/create" size="lg">
                    <IconPlus />
                  </ActionIcon>
                ) : (
                  <Button component={Link} href="/create">
                    Создать проект
                  </Button>
                )}

                <Menu shadow="md" width={200} zIndex={3000}>
                  <Menu.Target>
                    <Avatar
                      radius="xl"
                      classNames={{ root: classes.mantineAvatarRoot }}
                      color={user.user_metadata.accentColor}
                      name={user.user_metadata.username}
                    ></Avatar>
                  </Menu.Target>

                  <Menu.Dropdown>
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
                    <Menu.Item
                      leftSection={<IconUser size={14} />}
                      component={Link}
                      href={`/account`}
                    >
                      Мой аккаунт
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                      color="red"
                      leftSection={<IconLogout size={14} />}
                      onClick={handleSignout}
                    >
                      Выйти
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </>
            )}
            <ThemeSwitcher size={isMobile ? 'lg' : '2.4em'} />
          </Group>
        </Group>
      </header>
      <Drawer
        opened={opened}
        onClose={close}
        size={300}
        position="left"
        withCloseButton={true}
        closeButtonProps={{ mr: 'md' }}
        padding="0 0 0 0"
        zIndex={5000}
        removeScrollProps={{ removeScrollBar: false }}
      >
        {links.map((link, index) => (
          <NavLink
            key={index}
            component={Link}
            href={link.href}
            active={link.href === pathName}
            label={link.label}
            classNames={navLinkClassNames}
            variant="light"
            onClick={close}
          />
        ))}
      </Drawer>
    </>
  )
}
