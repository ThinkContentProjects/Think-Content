import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

const baseStyle = definePartsStyle({
  list: {
   // _dark or _light
    _dark: {
      '--menu-bg': "#191A1D",
    },
  },
})

export const menuTheme =  defineMultiStyleConfig({ baseStyle })