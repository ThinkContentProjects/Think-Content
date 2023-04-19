// 1. Import `extendTheme`
import "@fontsource/source-sans-pro/300.css";
import "@fontsource/source-sans-pro/400.css";
import "@fontsource/source-sans-pro/700.css";
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { Button } from "./button";
import { mode } from '@chakra-ui/theme-tools';
import modalTheme from "./modal";
import { menuTheme } from "./menu";

// 2. Call `extendTheme` and pass your custom values
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#f7fafc',
      500: '#718096',
      900: '#171923',
    },
  },
  fonts: {
    body: "Source Sans Pro, sans-serif",
  },
  styles: {
    global: (props: any) => ({
      body: {
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('gray.100', "#282828")(props),
      },
    }),
  },
  components: {
    Button,
    Menu: menuTheme,
    Modal: modalTheme,
  },
});
export default theme;
