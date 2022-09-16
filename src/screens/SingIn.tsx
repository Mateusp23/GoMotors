import { VStack, Heading, Icon, useTheme, Text } from 'native-base';

import Logo from "../assets/logo_little.svg";
import { Button } from '../components/Button';

export function SignIn() {
  const { colors } = useTheme();

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Text color="white" fontSize="xl" mt={12} mb={6}>
        Acesse sua conta
      </Text>

      <Button title="Entrar com Google" w="full" />
    </VStack>
  );
}