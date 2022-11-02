import { ScrollView, Select, useTheme, VStack } from "native-base";
import React, { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Forms/Input";
import { Header } from "../components/Header";

// tela vai ser chamada quando for clicada no motoboy na listagem da home do restaurante
export function MotoboyDetails() {
  const [isCitySelected, setIsCitySelected] = useState("torres");
  const { colors } = useTheme();

  return (
    <VStack flex={1} p={5} bg="gray.700">
      <Header isBackScreen title="Detalhes do Motoboy" />

      {/* <OrderListMotoboys data={[]} onPress={() => { }} /> */}
      <Header isBackScreen={false} title="Envio da Entrega" />

      <ScrollView bg="gray.700" w="full" showsVerticalScrollIndicator={false}>
        <Select
          minWidth="200"
          accessibilityLabel="Selecione uma cidade"
          placeholder="Selecione uma cidade"
          _selectedItem={{
            color: "primary.700",
          }}
          placeholderTextColor={colors.primary[700]}
          color={colors.primary[700]}
          fontSize="md"
          mt={6}
          onValueChange={(itemValue) => setIsCitySelected(itemValue)}
          defaultValue={isCitySelected}
        >
          <Select.Item shadow={1} label="Torres - RS" value="torres" />
          <Select.Item shadow={1} label="Passo de Torres - RS" value="passo" />
        </Select>

        <Input bg="gray.600" type="text" placeholder="Rua" mt={5} isRequired />
        <Input bg="gray.600" placeholder="Bairro" mt={3} isRequired />
        <Input bg="gray.600" placeholder="Complemento" mt={3} isRequired />
        <Input
          bg="gray.600"
          placeholder="Tipo de entrega: Ex pizza, fritas..."
          mt={3}
          isRequired
        />
        <Input
          bg="gray.600"
          placeholder="Valor da entrega: Ex R$ 12,00"
          mt={3}
          isRequired
        />
        <Button
          bgColor="primary.700"
          color="white"
          title="Solicitar entrega"
          mt={4}
          mb={4}
        />
      </ScrollView>
    </VStack>
  );
}
