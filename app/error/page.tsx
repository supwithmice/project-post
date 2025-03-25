'use client'

import { Flex, Title } from "@mantine/core"

export default function ErrorPage() {
  return (
        <Flex h="80vh" justify="center" align="center" direction="column">
          <Title size="h3" order={2} my="md" textWrap="nowrap">
            Что-то пошло не так
          </Title>
        </Flex>
      )
}
