import { VStack, Heading, Icon, useTheme, Text, Center, Box } from 'native-base';

import Logo from "../assets/logo_little.svg";
import { Button } from '../components/Button';
import { ButtonSignIn } from '../components/ButtonSignIn';

export function SignIn() {
  const { colors } = useTheme();

  return (
    <Center height="full" bg="gray.600">
      <Logo />
      <Box width="full" p={6}>
        <Text color="white" textAlign="center" fontSize="xl" mt={3} mb={3}>
          Acesse sua conta
        </Text>
        <VStack>
          <ButtonSignIn />
        </VStack>
      </Box>
    </Center>
  );
}