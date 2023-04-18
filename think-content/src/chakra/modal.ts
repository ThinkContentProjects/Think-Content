import { mode } from '@chakra-ui/theme-tools';

const modalTheme = {
    // setup light/dark mode component defaults
    baseStyle: (props:any) => ({
      dialog: {
        borderRadius: 'md',
        bg: mode('white', "#202020")(props),
      }
    })
}

export default modalTheme;