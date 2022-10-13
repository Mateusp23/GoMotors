import { Input as NativeBaseInput, IInputProps } from "native-base";

interface InputProps extends IInputProps {
  bgColor: string;
}

export function Input({ bgColor = "gray.700", ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      bg={bgColor}
      height={14}
      size="md"
      borderWidth={0}
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      _focus={{
        borderWidth: 1,
        borderColor: "primary.700",
        bg: "gray.700",
      }}
      {...rest}
    />
  );
}
