import React from "react";
import { VStack, Heading, useTheme } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Forms/Input";
import { Button } from "../components/Button";

export function EditMotoboy() {
  const { colors } = useTheme();

  return (
    <VStack flex={1} p={5} bg="gray.600">
      <Header isBackScreen title="Editar Perfil - Motoboy" />

      <Input
        type="text"
        placeholder="Quanto tempo ja realiza entregas?"
        isRequired
      />
      <Input keyboardType="numeric" placeholder="Telefone" mt={3} />

      <Input type="text" placeholder="Chave pix" mt={3} isRequired />
      <Input
        placeholder="Conte um pouco de sua experiência"
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
