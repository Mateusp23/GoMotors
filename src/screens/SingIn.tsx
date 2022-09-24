import { VStack, Heading, Icon, useTheme, Text } from 'native-base';

import Logo from "../assets/logo_little.svg";
import { Button } from '../components/Button';

export function SignIn() {
  const { colors } = useTheme();

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={40}>
      <Logo />

      <Text color="white" fontSize="xl" mt={16} mb={6}>
        Acesse sua conta
      </Text>

      <Button bg="gray.650" color="primary.700" title="Entrar com Google" w="full" mb={6}/>
      <Button bg="primary.700" color="white" title="Entrar com Apple" w="full" mb={6}/>
    </VStack>
  );
}