// a wrapper for Image element from next/image to include some properties of Image from @mantine/core

import Image from 'next/image'
import { Box, ActionIcon, Stack } from '@mantine/core'
import type { MantineSize } from '@mantine/core'
import classes from './NextImage.module.css'
import cx from 'clsx'

type NextImageProps = {
  children?: React.ReactNode
  src: string
  alt: string
  radius?: MantineSize
  aspectRatio?: string
  hoverable?: boolean
  hoverIcon?: Icon
  classNames?: {
    root?: string
    image?: string
    iconRoot?: string
    icon?: string
  }
}

type Icon = {
  icon: React.ReactNode
  iconLabel: string
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

export default function NextImage({
  children,
  src,
  alt,
  radius,
  aspectRatio,
  hoverable,
  hoverIcon,
  classNames,
}: NextImageProps) {
  return (
    <Box
      className={cx(
        classes.imageRoot,
        classNames?.root,
        (hoverable || hoverIcon) && classes.hoverable
      )}
      style={{
        aspectRatio: aspectRatio ? aspectRatio : '16 / 9',
      }}
    >
      <Image
        className={classNames?.image}
        style={{
          borderRadius: radius ? `var(--mantine-radius-${radius})` : undefined,
          objectFit: 'cover',
        }}
        fill
        src={src}
        alt={alt}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {hoverIcon && (
        <ActionIcon
          classNames={{
            root: cx(classes.icon, classNames?.iconRoot),
            icon: classNames?.icon,
          }}
          onClick={hoverIcon.onClick}
          m="xs"
          variant="light"
          color="grey"
          size="lg"
          aria-label={hoverIcon.iconLabel}
        >
          {hoverIcon.icon}
        </ActionIcon>
      )}

      {children}
    </Box>
  )
}
