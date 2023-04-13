import { ComponentStyleConfig } from '@chakra-ui/theme';

export const Button: ComponentStyleConfig = {
    baseStyle: {
    borderRadius: "60px",
    fontSize: "10pt",
    fontWeight: 700,
    _focus: {
      boxShadow: "none",
    },
  },
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
    solid: {
      color: "white",
      bg: "purple.600",
      _hover: {
        bg: "purple.400",
      },
    },
    outline: {
      color: "purple.600",
      border: "1px solid",
      borderColor: "purple.600",
    },
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