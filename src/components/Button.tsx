import { Button as ButtonNativeBase, Heading, IButtonProps } from 'native-base';

type Props = IButtonProps & {
  title: string;
  bgColor: string;
  color: string;
  width?: any;
  bg?: string;
}

export function Button({ title, bgColor, color, width = "full", bg = "primary.400", ...rest }: Props) {
  return (
    <ButtonNativeBase 
      bg={bgColor}
      h={14}
      width={width}
      fontSize="sm"
      rounded="sm"
      _pressed={{ bg: bg }}
      {...rest}
    >
      <Heading color={color} fontSize="md">
        {title}
      </Heading>
    </ButtonNativeBase>
  );
}