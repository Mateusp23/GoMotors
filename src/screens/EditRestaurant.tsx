import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { useTheme, VStack } from "native-base";
import { Alert } from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Forms/Input";
import { Header } from "../components/Header";

export function EditRestaurant() {
  const [road, setRoad] = useState("");
  const [district, setDistrict] = useState("");
  const [complement, setComplement] = useState("");
  const [description, setDescription] = useState("");
  const { colors } = useTheme();
  const navigation = useNavigation();

  async function handleSendData() {
    if (!road || !district || !complement || !description) {
      return Alert.alert("Editar", "Preencha os campos.");
    }
  }

  return (
    <VStack flex={1} p={5} bg="gray.600">
      <Header isBackScreen title="Editar Perfil - Restaurante" />

      <Input type="text" placeholder="Rua" isRequired onChangeText={setRoad} />
      <Input
        placeholder="Bairro"
        mt={3}
        isRequired
        onChangeText={setDistrict}
      />
      <Input
        placeholder="Complemento"
        mt={3}
        isRequired
        onChangeText={setComplement}
      />
      <Input
        placeholder="Conte sua história no mercado, qual ramo trabalha..."
        type="text"
        flex={1}
        mt={3}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
      />
      <Button
        bgColor="primary.700"
        color="white"
        title="Confirmar"
        mt={4}
        mb={4}
        onPress={handleSendData}
      />
    </VStack>
  );
}
