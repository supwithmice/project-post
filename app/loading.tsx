import { LoadingOverlay } from '@mantine/core'

export default function Loading() {
  return (
    <LoadingOverlay
    visible={true}
      zIndex={900}
      overlayProps={{ radius: 'sm', blur: 2 }}
      loaderProps={{ type: 'bars' }}
    />
  )
}
