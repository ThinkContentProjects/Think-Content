import { useRadio, UseRadioProps, Box } from "@chakra-ui/react";
import React from "react";

// this should not be type any...
const CustomRadio = (props: any) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        textAlign="center"
        {...checkbox}
        height="45px"
        width="150px"
        cursor='pointer'
        borderWidth='1px'
        borderRadius='30'
        boxShadow='md'
        _checked={{
          bg: "#915EFF",
          color: '',
          borderColor: "#915EFF",
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  )
};

export default CustomRadio;
