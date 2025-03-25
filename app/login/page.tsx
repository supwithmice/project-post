'use client'

import { useForm } from '@mantine/form'
import { login, signup } from './actions'
import {
  ActionIcon,
  Button,
  Card,
  ColorInput,
  DEFAULT_THEME,
  Flex,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  Text,
} from '@mantine/core'
import { useState } from 'react'
import {
  IconArrowLeft,
  IconAt,
  IconPassword,
  IconUser,
} from '@tabler/icons-react'
import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const loginForm = useForm<{
    email: string
    password: string
  }>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      password: (value) =>
        value.length === 0
          ? 'Введите пароль'
          : value.length < 6
          ? 'Неверный пароль'
          : null,
      email: (value) =>
        value.length === 0
          ? 'Введите Email'
          : /^\S+@\S+$/.test(value)
          ? null
          : 'Некорректный Email',
    },
  })

  const signUpForm = useForm<{
    username: string
    email: string
    password: string
    accentColor: string
  }>({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      email: '',
      password: '',
      accentColor: '#fa5252',
    },
    validate: {
      username: (value) => (value.length === 0 ? 'Введите имя' : null),
      password: (value) =>
        value.length === 0
          ? 'Введите пароль'
          : value.length < 6
          ? 'Пароль должен состоять из 8 или более символов'
          : null,
      email: (value) =>
        value.length === 0
          ? 'Введите Email'
          : /^\S+@\S+$/.test(value)
          ? null
          : 'Некорректный Email',
    },
  })

  async function handleLogin(values: any) {
    setLoading(true)
    const { error } = await login(values)
    if (error) {
      loginForm.setFieldError(
        'password',
        <Text fz="xs">Неверный пароль или Email</Text>
      )
      setLoading(false)
    } else {
      router.push('/')
    }
  }
  async function handleSignup(values: any) {
    setLoading(true)
    const { error } = await signup(values)
    if (error) {
      loginForm.setFieldError('username', <Text fz="xs">{error.message}</Text>)
      setLoading(false)
    } else {
      router.push('/')
    }
  }

  return (
    <Flex justify="center" align="center" h="75vh">
      <Card shadow="md" w="100%" maw="400" py="lg">
        {!isSignUp ? (
          <>
            <Title order={2} ta="center" mb="md">
              Вход
            </Title>
            <form onSubmit={loginForm.onSubmit(handleLogin)}>
              <Stack>
                <TextInput
                  disabled={loading}
                  withAsterisk
                  aria-label="Email"
                  label="Email"
                  leftSection={<IconAt size={16} />}
                  placeholder="example@gmail.com"
                  {...loginForm.getInputProps('email')}
                />
                <PasswordInput
                  disabled={loading}
                  withAsterisk
                  label="Пароль"
                  aria-label="Пароль"
                  leftSection={<IconPassword size={16} />}
                  placeholder=""
                  {...loginForm.getInputProps('password')}
                />
                <Group justify="center" mt="md">
                  <Button variant="outline" onClick={() => setIsSignUp(true)}>
                    Зарегистрироваться
                  </Button>
                  <Button type="submit" disabled={loading}>
                    Войти
                  </Button>
                </Group>
              </Stack>
            </form>
          </>
        ) : (
          <>
            <ActionIcon
              disabled={loading}
              pos="absolute"
              variant="subtle"
              left={16}
              top={20}
              color="var(--mantine-color-gray-6)"
              onClick={() => setIsSignUp(false)}
            >
              <IconArrowLeft />
            </ActionIcon>

            <Title order={2} ta="center" mb="md">
              Регистрация
            </Title>

            <form onSubmit={signUpForm.onSubmit(handleSignup)}>
              <Stack>
                <TextInput
                  withAsterisk
                  disabled={loading}
                  label="Имя пользователя"
                  placeholder="Joe mama"
                  leftSection={<IconUser size={16} />}
                  aria-label="Имя пользователя"
                  {...signUpForm.getInputProps('username')}
                />
                <TextInput
                  disabled={loading}
                  withAsterisk
                  aria-label="Email"
                  label="Email"
                  leftSection={<IconAt size={16} />}
                  placeholder="example@gmail.com"
                  {...signUpForm.getInputProps('email')}
                />
                <PasswordInput
                  disabled={loading}
                  withAsterisk
                  label="Пароль"
                  aria-label="Пароль"
                  leftSection={<IconPassword size={16} />}
                  placeholder=""
                  {...signUpForm.getInputProps('password')}
                />

                <ColorInput
                  disabled={loading}
                  defaultValue={DEFAULT_THEME.colors.violet[5]}
                  label="Цвет"
                  description="Изменяет цвет сайта"
                  swatches={[
                    DEFAULT_THEME.colors.red[6],
                    DEFAULT_THEME.colors.pink[6],
                    DEFAULT_THEME.colors.grape[6],
                    DEFAULT_THEME.colors.violet[6],
                    DEFAULT_THEME.colors.indigo[6],
                    DEFAULT_THEME.colors.blue[6],
                    DEFAULT_THEME.colors.cyan[6],
                    DEFAULT_THEME.colors.teal[6],
                    DEFAULT_THEME.colors.green[6],
                    DEFAULT_THEME.colors.lime[6],
                    DEFAULT_THEME.colors.yellow[6],
                    DEFAULT_THEME.colors.orange[6],
                  ]}
                  withPicker={false}
                  swatchesPerRow={6}
                  disallowInput
                />

                <Group justify="center" mt="md">
                  <Button type="submit" disabled={loading}>
                    Зарегистрироваться
                  </Button>
                </Group>
              </Stack>
            </form>
          </>
        )}
      </Card>
    </Flex>
  )
}
