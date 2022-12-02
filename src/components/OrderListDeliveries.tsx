import {
  HStack, Text, VStack
} from "native-base";
import { Button } from "./Button";

type Props = {
  road: string;
  complement: string;
  district: string;
  isCitySelected: string;
  restaurantData: string;
  typeDeliveries: string;
  value: string;
  titleBtn: string;
  titleBtnFinish?: string;
  closeDeliveries: () => void;
  closeDeliveriesFinish?: () => void;
}

export function OrderListDeliveries({
  road,
  complement,
  district,
  isCitySelected,
  restaurantData,
  typeDeliveries,
  value,
  closeDeliveries,
  titleBtn,
  closeDeliveriesFinish,
  titleBtnFinish
}: Props) {
  
  return (
    <VStack>
      <HStack
        bg="gray.600"
        mb={2}
        alignItems="center"
        justifyContent="space-between"
        rounded="sm"
        overflow="hidden"
      >
        <VStack flex={1} my={5} ml={5}>
          <Text color="white" fontSize="md">
            {restaurantData}
          </Text>
          <HStack alignItems="center">
            <Text color="white" fontSize="sm" ml={1} mt={2} mb={2}>
              Endereço: {road}
            </Text>
          </HStack>
          <Text color="white" fontSize="sm" ml={1} mb={2}>
            Bairro: {district}
          </Text>
          <Text color="white" fontSize="sm" ml={1} mb={2}>
            Complemento: {complement}
          </Text>
          <Text color="white" fontSize="sm" ml={1} mb={2}>
            Cidade: {isCitySelected}
          </Text>
          <Text color="white" fontSize="sm" ml={1} mb={2}>
            Entrega: {typeDeliveries}
          </Text>
          <Text color="white" fontSize="sm" ml={1} mb={2}>
            Valor: {value}
          </Text>

          <Button
            mt={2}
            title={titleBtn}
            bgColor="gray.600"
            color="primary.700"
            width={72}
            bg="gray.700"
            onPress={closeDeliveries}
          />
          <Button
            mt={2}
            title={titleBtnFinish}
            bgColor="gray.600"
            color="primary.700"
            width={72}
            bg="gray.700"
            onPress={closeDeliveriesFinish}
          />
        </VStack>
      </HStack>
    </VStack>
  );
}
