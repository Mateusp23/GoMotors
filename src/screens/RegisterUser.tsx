import React, { useState } from "react";
import { VStack, Text, Heading, Icon, useTheme } from "native-base";
import { Input } from "../components/Forms/Input";
import { Alert } from "react-native";
import { Envelope, Key, User } from "phosphor-react-native";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

export function RegisterUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleNewAccount() {
    setIsLoading(true);

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert("Conta", "Cadastrado com sucesso!");
        navigation.goBack();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <VStack flex={1} alignItems="center" px={8} pt={8} bg="gray.600">
      <Header isBackScreen title="Cadastro" />

      {/* <Input
        mb={4}
        placeholder="Nome"
        InputLeftElement={
          <Icon as={<User color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setName}
      /> */}
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
        title="Cadastrar"
        w="full"
        bgColor="primary.700"
        color="white"
        onPress={handleNewAccount}
        isLoading={isLoading}
      />
    </VStack>
  );
}
