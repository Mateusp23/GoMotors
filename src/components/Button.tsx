import { Button as ButtonNativeBase, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
  title: string;
  bgColor: string;
  color: string;
}

export function Button({ title, bgColor, color, ...rest }: Props) {
  return (
    <ButtonNativeBase 
      bg={bgColor}
      h={14}
      fontSize="sm"
      rounded="sm"
      _pressed={{ bg: "primary.400" }}
      {...rest}
    >
      <Heading color={color} fontSize="md">
        {title}
      </Heading>
    </ButtonNativeBase>
  );
}