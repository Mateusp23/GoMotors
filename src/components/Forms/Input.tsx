import { Input as NativeBaseInput, IInputProps } from 'native-base';

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput 
      bg="gray.700"
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