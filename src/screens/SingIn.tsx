import React, { useState } from "react";
import {
  VStack,
  Heading,
  Icon,
  useTheme,
  HStack,
  Button as ButtonNative,
  Text,
} from "native-base";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import * as AuthSession from "expo-auth-session";
import { useNavigation } from "@react-navigation/native";
import { Envelope, Key } from "phosphor-react-native";

import Logo from "../assets/logo_little.svg";
import { Button } from "../components/Button";
import { ButtonSignIn } from "../components/ButtonSignIn";
import { Input } from "../components/Forms/Input";

type AuthResponse = {
  type: string;
  params: {
    access_token: string;
  };
};

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
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
        setIsLoading(false);

        if (error.code === "auth/invalid-email") {
          return Alert.alert("Entrar", "E-mail inválido.");
        }

        if (error.code === "auth/wrong-password") {
          return Alert.alert("Entrar", "E-mail ou senha inválidos.");
        }

        if (error.code === "auth/user-not-found") {
          return Alert.alert("Entrar", "E-mail ou senha inválidos");
        }

        return Alert.alert("Entrar", "Não foi possível acessar");
      });
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
        <ButtonNative variant="unstyled">
          <Text fontSize="md" color="white">
            Esqueci minha senha
          </Text>
        </ButtonNative>
      </HStack>
      {/* <Box width="full" p={6}>
        <Text color="white" textAlign="center" fontSize="xl" mt={3} mb={3}>
          Acesse sua conta
        </Text>
        <Box width="full" mt={4}>
          <BtnSignIn
            bg="gray.650"
            h={14}
            fontSize="sm"
            rounded="sm"
            _pressed={{ bg: "gray.700" }}
            onPress={handleSignIn}
          >
            <HStack height="full" alignItems="center" justifyContent="center">
              <Icon as={<GoogleLogo color={colors.primary[700]} size={32} />} />
              <Divider
                height="full"
                thickness="2"
                bg="primary.700"
                h="full"
                mx="4"
                orientation="vertical"
              />
              <Heading color="primary.700" fontSize="lg">
                Entrar com Google
              </Heading>
            </HStack>
          </BtnSignIn>
        </Box>
      </Box> */}
    </VStack>
  );
}
