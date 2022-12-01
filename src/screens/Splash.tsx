import { Center, Heading, Text } from 'native-base';
import { Button } from '../components/Button';

import { useNavigation } from '@react-navigation/native';
import Logo from "../assets/logo_little.svg";

export function Splash() {
  const navigation = useNavigation();

  const handleSignIn = () => {
    navigation.navigate('signIn');
  }

  return (
    <Center flex={1} px={8} bg="gray.700">
      <Logo />

      <Heading mt={12} color="white">Bem vindo(a) ao GoMotors</Heading>
      <Text mt={4} textAlign="center" color="white"fontSize="md">App para auxiliar motoboys e restaurantes em suas entregas</Text>
    
      <Button
        mt={10}
        title="Acessar"
        bgColor="gray.600"
        color="primary.700"
        w="full"
        bg="gray.700"
        onPress={handleSignIn}
      />
    </Center>
  );
}