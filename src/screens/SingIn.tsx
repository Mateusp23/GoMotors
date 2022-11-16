import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import {
  Button as ButtonNative, Heading, HStack, Icon, Text, useTheme, VStack
} from "native-base";
import { Envelope, Key } from "phosphor-react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

import Logo from "../assets/logo_little.svg";
import { Button } from "../components/Button";
import { Input } from "../components/Forms/Input";

export function SignIn() {
  // const { userType, setUserType } = useAuth();
  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleRegisterUser() {
    navigation.navigate("registerUser");
  }
  
  const getTypeUser = useCallback(async () => {
    const userTypeStorage = await AsyncStorage.getItem('key');
    setUserType(userTypeStorage);
  }, [userType]);

  useEffect(() => {
    getTypeUser();
    console.log("tipo user:", userType);
  }, []);

  function handleSignIn() {
    if (!email || !password) {
      return Alert.alert("Entrar", "Informe e-mail e senha");
    }

    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        if (userType === 'motoboy') {
          return navigation.navigate("homeMotoboy");
        } else if (userType === 'restaurant') {
          return navigation.navigate("homeRestaurant");
        } else {
          handleRegisterUser()
        }
      })
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

  function handleForgotPassword() {
    if (!email) {
      return Alert.alert("Recuperar senha", "Informe um e-mail");
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() =>
        Alert.alert("Redefinir senha", "Enviamos um e-mail para você")
      )
      .catch((error) => console.log(error));
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
