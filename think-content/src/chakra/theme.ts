// 1. Import `extendTheme`
import "@fontsource/source-sans-pro/300.css";
import "@fontsource/source-sans-pro/400.css";
import "@fontsource/source-sans-pro/700.css";
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { Button } from "./button";
import { mode } from "@chakra-ui/theme-tools";
import modalTheme from "./modal";
import { menuTheme } from "./menu";
import { switchTheme } from "./switch";
import { cardTheme } from "./card";

// 2. Call `extendTheme` and pass your custom values
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      // light grey (modal, menu etc)
      50: "#191A1D",
      // light modal footer
      100: "#E2E8F0",
      // dark modal footer
      200: "#3C3C3C",
      // darker grey
      300: "#202020",
    },
  },
  fonts: {
    body: "Source Sans Pro, sans-serif",
  },
  styles: {
    global: (props: any) => ({
      body: {
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("gray.100", "#121316")(props),
      },
    }),
  },
  components: {
    Button,
    Menu: menuTheme,
    Modal: modalTheme,
    Switch: switchTheme,
    Card: cardTheme,
  },
});
export default theme;
