import { VStack, Heading, Icon, useTheme } from 'native-base';

export function Splash() {
  const { colors } = useTheme();

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      {/* <Logo /> */}

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Bem vindo ao GoMotors!
      </Heading>
    </VStack>
  );
}