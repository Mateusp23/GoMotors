import React, { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import { VStack, Heading, useTheme } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Forms/Input";
import { Button } from "../components/Button";

export function EditRestaurant() {
  const [street, setStreet] = useState("");
  const [district, setDistrict] = useState("");
  const [complement, setComplement] = useState("");
  const [description, setDescription] = useState("");
  const { colors } = useTheme();

  async function handleSendData() {
    firestore()
      .collection("info")
      .add({
        street,
        district,
        complement,
        description,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Informações adicionadas com sucesso.");
      })
      .catch((error) => console.error(error));
  }

  return (
    <VStack flex={1} p={5} bg="gray.600">
      <Header isBackScreen title="Editar Perfil - Restaurante" />

      <Input
        type="text"
        placeholder="Rua"
        isRequired
        onChangeText={setStreet}
      />
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
