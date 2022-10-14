import React from "react";
import { VStack, Heading, useTheme } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Forms/Input";
import { Button } from "../components/Button";

export function EditRestaurant() {
  const { colors } = useTheme();

  return (
    <VStack flex={1} p={5} bg="gray.600">
      <Header isBackScreen title="Editar Perfil - Contratante" />

      <Input type="text" placeholder="Rua" isRequired />
      <Input placeholder="Bairro" mt={3} isRequired />
      <Input placeholder="Complemento" mt={3} isRequired />
      <Input
        placeholder="Conte sua história no mercado, qual ramo trabalha..."
        type="text"
        flex={1}
        mt={3}
        multiline
        textAlignVertical="top"
      />
      <Button
        bgColor="primary.700"
        color="white"
        title="Confirmar"
        mt={4}
        mb={4}
      />
    </VStack>
  );
}
