import { useNavigation } from '@react-navigation/native';
import {
  Button as ButtonNative, Heading, HStack, Icon, Text, useTheme, VStack
} from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import { useState } from 'react';

import { Alert } from "react-native";
import Logo from "../assets/logo_little.svg";
import { Button } from '../components/Button';
import { Input } from "../components/Forms/Input";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleRegisterUser() {
    navigation.navigate("registerUser");
  }

  function handleSignIn() {
    if (!email || !password) {
      return Alert.alert("Entrar", "Informe e-mail e senha");
    }

    setIsLoading(true);
    navigation.navigate("registerUser");
  }

  function handleForgotPassword() {
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="white" textAlign="center" fontSize="xl" mt={10} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        mb={4}
        placeholder="E-mail"
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setEmail}
      />
      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        w="full"
        bgColor="primary.700"
        color="white"
        onPress={handleSignIn}
        isLoading={isLoading}
      />

      <HStack px={12}>
        <ButtonNative variant="unstyled" onPress={handleRegisterUser}>
          <Text fontSize="md" color="white">
            Criar conta
          </Text>
        </ButtonNative>
        <ButtonNative variant="unstyled" onPress={handleForgotPassword}>
          <Text fontSize="md" color="white">
            Esqueci minha senha
          </Text>
        </ButtonNative>
      </HStack>
    </VStack>
  );
}