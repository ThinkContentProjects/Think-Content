import { ComponentStyleConfig } from '@chakra-ui/theme';

export const Button: ComponentStyleConfig = {
    baseStyle: ({ colorMode }) => ({
    borderRadius: "10px",
    fontSize: "10pt",
    fontWeight: 500,
    height:"34px",
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
      color: colorMode === "dark" ? "white" : "white",
      bg: colorMode === "dark" ? "#915EFF" : "#915EFF",
      _hover: {
        bg: colorMode === "dark" ? "purple.300" : "purple.300",
      },
    }),
    outline: ({ colorMode }) => ({
      color: colorMode === "dark" ? "white" : "#915EFF",
      border: "1px solid",
      borderColor: colorMode === "dark" ? "white" : "#915EFF",
    }),
    oauth: {
      height: "34px",
      border: "1px solid",
      color: "Black",
      borderRadius: "20",
      borderColor: "gray.100",
      bg: "White",
      _hover: {
        borderColor: "blue.500",
      },
    },
  },
};