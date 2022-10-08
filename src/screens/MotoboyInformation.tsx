import { Header } from "../components/Header";
import { VStack } from "native-base";

// tela vai ser chamada quando for clicada no motoboy na listagem da home do restaurante
export function MotoboyInformation() {
  return (
    <VStack flex={1} p={5} bg="gray.600">
      <Header isBackScreen title="Detalhes do Motoboy" />
    </VStack>
  );
}
