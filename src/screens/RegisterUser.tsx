import { useNavigation } from '@react-navigation/native';
import {
  Icon, useTheme, VStack
} from "native-base";
import { useState } from "react";

import { Envelope, Key } from "phosphor-react-native";

import { Button } from '../components/Button';
import { Input } from "../components/Forms/Input";
import { Header } from "../components/Header";

export function RegisterUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleCreateAccount() {
    console.log("sua nova conta");
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Header title="Cadastre-se" isBackScreen />

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
        onPress={handleCreateAccount}
        isLoading={isLoading}
      />
    </VStack>
  );
}