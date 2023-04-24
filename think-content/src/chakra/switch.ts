import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  switchAnatomy.keys,
)

export const switchTheme = defineMultiStyleConfig({
  defaultProps: {
    colorScheme: 'purple',
  },
})