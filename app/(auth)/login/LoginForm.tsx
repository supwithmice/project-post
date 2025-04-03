'use client'

import {
  Title,
  Text,
  Stack,
  TextInput,
  PasswordInput,
  Group,
  Button,
  ActionIcon,
  ColorInput,
  DEFAULT_THEME,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import {
  IconAt,
  IconPassword,
  IconArrowLeft,
  IconUser,
} from '@tabler/icons-react'
import { useState, useEffect } from 'react'
import { login, signup } from './actions'
import { redirect } from 'next/navigation'

export default function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState<React.ReactNode | null>(null)

  const loginForm = useForm<{
    email: string
    password: string
  }>({
    mode: 'uncontrolled',
    validateInputOnBlur: true,
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      password: (value) => (value.length === 0 ? 'Введите пароль' : null),
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
    validateInputOnBlur: true,
    initialValues: {
      username: '',
      email: '',
      password: '',
      accentColor: '#7950f2',
    },
    validate: {
      username: (value) => (value.length === 0 ? 'Введите имя' : null),
      password: (value) =>
        value.length === 0
          ? 'Введите пароль'
          : value.length < 8
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
      redirect('/')
    }
  }
  async function handleSignup(values: any) {
    setLoading(true)
    setMsg(null)

    const { error } = await signup(values)
    if (error) {
      setLoading(false)
      setMsg(
        <Text fz="sm" c="red">
          {error}
        </Text>
      )
    } else {
      redirect('/')
    }
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <>
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
                defaultValue={'#7950f2'}
                withEyeDropper={false}
                label="Цвет"
                description="Изменяет цвет сайта"
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
                {...signUpForm.getInputProps('accentColor')}
              />
              {msg}
              <Group justify="center" mt="md">
                <Button type="submit" disabled={loading}>
                  Зарегистрироваться
                </Button>
              </Group>
            </Stack>
          </form>
        </>
      )}
    </>
  )
}
