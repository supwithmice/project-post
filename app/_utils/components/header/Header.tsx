'use client'

import { Group, NavLink, Title, Anchor, Burger, Drawer } from '@mantine/core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeSwitcher from '../ThemeSwitcher'
import classes from './Header.module.css'
import { useDisclosure } from '@mantine/hooks'

const navLinkClassNames = {
  root: classes.navLinkRoot,
  body: classes.navLinkBody,
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

export default function Header({ actions }: { actions: React.ReactNode }) {
  const pathName = usePathname()
  const [opened, { toggle, close }] = useDisclosure()

  return (
    <>
      <Group classNames={{ root: classes.headerSpacer }}></Group>
      <header>
        <Group
          classNames={{ root: classes.headerRoot }}
          px={{ base: 'sm', sm: 'lg' }}
          justify="space-between"
          align="center"
          pos="fixed"
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
          <Group className={classes.navBarRoot}>
            {links.map((link, index) => (
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
          <Group classNames={{ root: classes.actionsRoot }}>
            {actions}
            <ThemeSwitcher />
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
