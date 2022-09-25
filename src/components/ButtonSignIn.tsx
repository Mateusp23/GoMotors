import { Stack, Box, HStack, Heading, Divider, Icon, Button as BtnSignIn, useTheme } from 'native-base';
import { GoogleLogo, AppleLogo } from 'phosphor-react-native';

export function ButtonSignIn() {
  const { colors } = useTheme();

  return (
    <Box width="full" p={5}>
      <BtnSignIn 
        bg="gray.650"
        h={14}
        fontSize="sm"
        rounded="sm"
        _pressed={{ bg: "gray.700" }}
      >
        <HStack height="full" alignItems="center" justifyContent="center">
          <Icon as={<GoogleLogo color={colors.primary[700]} size={32} />} />
          <Divider height="full" thickness="2" bg="primary.700" h="full" mx="4" orientation="vertical" />
          <Heading color="primary.700" fontSize="lg">Entrar com Google</Heading>
        </HStack>
      </BtnSignIn>
      
      <BtnSignIn 
        bg="primary.700"
        h={14}
        fontSize="sm"
        rounded="sm"
        _pressed={{ bg: "primary.400" }}
        mt={4}
      >
        <HStack height="full" alignItems="center" justifyContent="center">
          <Icon as={<AppleLogo color={colors.white} size={32} />} />
          <Divider height="full" thickness="2" bg="white" h="full" mx="4" orientation="vertical" />
          <Heading color="white" fontSize="lg">Entrar com a Apple</Heading>
        </HStack>
      </BtnSignIn>
    </Box>
  );
}