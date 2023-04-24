import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle(({ colorMode }) => ({
  // define the part you're going to style
  container: {
    backgroundColor: colorMode === "dark" ? "#3C3C3C" : "white",
  },
  header: {
    paddingBottom: "2px",
  },
  body: {
    paddingTop: "2px",
  },
  footer: {
    paddingTop: "2px",
  },
}));

export const cardTheme = defineMultiStyleConfig({ baseStyle });
