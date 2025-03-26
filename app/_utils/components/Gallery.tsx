'use client'

import { Grid, GridCol, Modal, Text } from '@mantine/core'
import NextImage from './NextImage'
import { IconMaximize } from '@tabler/icons-react'
import classes from './Gallery.module.css'
import { modals } from '@mantine/modals'
import { Image } from '../../types'

// here i might have wasted time on nothing. don't ask
const imageDisplay = (image: Image) => {
  modals.open({
    removeScrollProps: { allowPinchZoom: true, removeScrollBar: false },
    zIndex: '1000',
    centered: true,
    withCloseButton: false,
    size: '90vh',
    styles: {},
    transitionProps: { transition: 'fade', duration: 200 },
    overlayProps: {
      backgroundOpacity: 0.55,
      blur: 3,
    },
    children: (
      <>
        <NextImage
          src={image.imageUrl}
          alt="Картинка"
          aspectRatio={image.aspectRatio}
          radius="md"
          classNames={{ root: classes.image }}
        ></NextImage>
        <Text mt="sm">{image.imageDescription}</Text>
      </>
    ),
  })
}

export default function Gallery({
  images,
  editable,
}: {
  images: Image[]
  editable?: boolean
}) {
  return (
    <Grid gutter="sm" grow>
      {images.map((image, index) => (
        <GridCol key={index} span={{ base: 12, xs: 6, md: 4, lg: 3 }}>
          <NextImage
            src={image.imageUrl}
            alt={`photo: ${image.imageDescription}`}
            radius="md"
            hoverIcon={{
              icon: <IconMaximize />,
              iconLabel: 'Развернуть',
              onClick: () => imageDisplay(image),
            }}
          />
        </GridCol>
      ))}
    </Grid>
  )
}
