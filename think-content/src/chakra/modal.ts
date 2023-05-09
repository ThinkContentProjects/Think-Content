import { mode } from '@chakra-ui/theme-tools';

const modalTheme = {
    // setup light/dark mode component defaults
    baseStyle: (props:any) => ({
      dialog: {
        borderRadius: 'md',
        bg: mode('white', "#191A1D")(props),
      }
    })
}

export default modalTheme;