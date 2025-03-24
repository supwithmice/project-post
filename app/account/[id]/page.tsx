import {
  Flex,
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
import Link from 'next/link'
import NotFound from '../../res/not-found.svg'
import { Project } from '../../types'
import { sampleAccounts } from '../../../sampleData'
import NextImage from '../../components/NextImage'
import ProjectsPanel from '../../components/ProjectsPanel'
import { IconEdit } from '@tabler/icons-react'
import classes from './page.module.css'

export default async function AccountPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // const resolvedParams = await params;
  // const id = Number(resolvedParams.id)
  const id = Number((await params).id)
  const account = isNaN(id)
    ? null
    : sampleAccounts.find((account) => account.id === id) // get this from firebase
  if (!account) {
    return (
      <Flex h="80vh" justify="center" align="center" direction="column">
        <NextImage
          src={NotFound}
          alt="Not Found"
          aspectRatio="1"
          classNames={{ root: classes.image }}
        />
        <Title size="h3" order={2} my="md" textWrap="nowrap">
          Такого аккаунта не существует
        </Title>
      </Flex>
    )
  }
  return (
    <>
      <Grid gutter={{ base: 'sm', sm: 'lg' }} mb="sm">
        <GridCol span={{ base: 12, sm: 4 }}>
          <Card h="100%" shadow="md">
            {/* TODO onClick */}
            <ActionIcon classNames={{root: classes.editRoot}} variant='light' ><IconEdit/></ActionIcon>
            <Stack gap="md" align="flex-start">
              <Title order={2}>Аккаунт</Title>
              <Group align="center">
                <Avatar
                  color={account.accentColor}
                  name={account.accountName}
                  size="lg"
                />
                <Text fs="md">{account.accountName}</Text>
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
        <ProjectsPanel id={account.id} />
    </>
  )
}
