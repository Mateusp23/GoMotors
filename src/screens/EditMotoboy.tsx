import { VStack } from "native-base";
import React, { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Forms/Input";
import { Header } from "../components/Header";

export function EditMotoboy() {
  const [deliveries, setDeliveries] = useState('');
  const [phone, setPhone] = useState('');
  const [pix, setPix] = useState('');
  const [experience, setExperience] = useState('');

  return (
    <VStack flex={1} p={5} bg="gray.600">
      <Header isBackScreen title="Editar Perfil - Motoboy" />

      <Input
        type="text"
        placeholder="Quanto tempo ja realiza entregas?"
        isRequired
        onChangeText={setDeliveries}
      />
      <Input keyboardType="numeric" placeholder="Telefone" mt={3} onChangeText={setPhone} />

      <Input type="text" placeholder="Chave pix" mt={3} isRequired onChangeText={setPix}/>
      <Input
        placeholder="Conte um pouco de sua experiência"
        type="text"
        flex={1}
        mt={3}
        multiline
        textAlignVertical="top"
        onChangeText={setExperience}
      />

      <Button
        bgColor="primary.700"
        color="white"
        title="Confirmar"
        mt={4}
        mb={4}
        onPress={() => {}}
      />
    </VStack>
  );
}
