import { Divider, List, ListItem, Stack, Text, Title } from '@mantine/core'

export default function About() {
  return (
    <Stack>
      <Title order={2}>О Project Post</Title>
      <Divider />
      <Text>
        <strong>Project Post</strong> — это платформа для публикации и
        демонстрации проектов в интернете. Основные возможности:{' '}
      </Text>
      <List>
        <ListItem>
          Загрузка проекта с описанием, галереей, файлами, и своей карточкой в каталоге.
        </ListItem>
        <ListItem>Возможность быстро поделиться работой.</ListItem>
        <ListItem>Всё необходимое для демонстрации своего проекта.</ListItem>
      </List>
      <Text>
        Целевая аудитория: все те, кому нужно представить свою работу, передать
        с ней файлы и фото, или просто интересно поделиться своим проектом.
      </Text>
      <Text>Зарегистрируйтесь и начните публиковать проекты!</Text>
    </Stack>
  )
}
