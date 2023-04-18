import { ComponentStyleConfig } from '@chakra-ui/theme';

export const Button: ComponentStyleConfig = {
    baseStyle: ({ colorMode }) => ({
    borderRadius: "60px",
    fontSize: "10pt",
    fontWeight: 700,
    _focus: {
      boxShadow: "none",
    },
  }),
  sizes: {
    sm: {
      fontSize: "8pt",
    },
    md: {
      fontSize: "11pt",
      // height: "28px",
    },
  },
  variants: {
    solid: ({ colorMode }) => ({
      color: colorMode === "dark" ? "black" : "white",
      bg: colorMode === "dark" ? "white" : "purple.600",
      _hover: {
        bg: colorMode === "dark" ? "gray.200" : "purple.400",
      },
    }),
    outline: ({ colorMode }) => ({
      color: colorMode === "dark" ? "white" : "purple.600",
      border: "1px solid",
      borderColor: colorMode === "dark" ? "white" : "purple.600",
    }),
    oauth: {
      height: "34px",
      border: "1px solid",
      borderColor: "gray.300",
      _hover: {
        bg: "gray.50",
      },
    },
  },
};