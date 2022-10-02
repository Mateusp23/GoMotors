import { HStack, Avatar, useTheme, Heading, IAvatarProps } from 'native-base';

type HeaderProfileProps = IAvatarProps & {
  title: string;
  url: string;
}

export function HeaderProfile({ title, url, ...rest }: HeaderProfileProps) {
  const { colors } = useTheme();

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.600"
      pt={12}
      pb={5}
      px={6}
    > 
      <Heading fontSize="md" color={colors.white}>Olá, {title}</Heading>
      <Avatar 
        bg="gray.600" 
        alignSelf="center" 
        size="md" 
        source={{url}}
        {...rest}
      />
    </HStack>
  );
}