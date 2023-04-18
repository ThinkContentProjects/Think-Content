// 1. Import `extendTheme`
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
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
  // colors: {
  //   brand: {
  //     100: "#FF3C00",
  //   },
  // },
  // fonts: {
  //   body: "Open Sans, sans-serif",
  // },
  colors: {
    brand: {
      50: '#f7fafc',
      500: '#718096',
      900: '#171923',
    }
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
