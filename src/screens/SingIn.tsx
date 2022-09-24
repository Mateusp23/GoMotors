import { VStack, Heading, Icon, useTheme, Text, Center, Box } from 'native-base';

import Logo from "../assets/logo_little.svg";
import { Button } from '../components/Button';

export function SignIn() {
  const { colors } = useTheme();

  return (
    <Center height="full" bg="gray.600">
      <Logo />
      <Box width="full" p={5}>

        <Text color="white" textAlign="center" fontSize="xl" mt={6} mb={6}>
          Acesse sua conta
        </Text>
        <VStack >
          <Button bg="gray.650" color="primary.700" title="Entrar com Google" mb={6}/>
          <Button bg="primary.700" color="white" title="Entrar com Apple" mb={6}/>
        </VStack>
      </Box>
    </Center>
  );
}