import { Header } from "../components/Header";
import { Avatar } from "native-base";
import {
  HStack,
  VStack,
  Text,
  useTheme,
  Box,
  Circle,
  Pressable,
  IPressableProps,
} from "native-base";

import IconAvailable from "../assets/icon-status-available.svg";
import IconDelivery from "../assets/icon-status-on-delivery.svg";

export type OrderMotoboyListProps = {
  id: string;
  name: string;
  picture: string;
  status: "Disponível" | "Em entrega";
};

type Props = IPressableProps & {
  data: OrderMotoboyListProps;
};

// tela vai ser chamada quando for clicada no motoboy na listagem da home do restaurante
export function MotoboyInformation({ data, ...rest }: Props) {
  const { colors } = useTheme();

  const statusColor =
    data.status === "Disponível" ? colors.green[300] : colors.secondary[700];

  const statusIcon =
    data.status === "Disponível" ? <IconAvailable /> : <IconDelivery />;

  return (
    <VStack flex={1} p={5} bg="gray.600">
      <Header isBackScreen title="Detalhes do Motoboy" />

      <HStack
        {...rest}
        bg="gray.600"
        mb={4}
        alignItems="center"
        justifyContent="space-between"
        rounded="sm"
        overflow="hidden"
      >
        <Box h="full" w={2} bg={statusColor} />

        <VStack flex={1} my={5} ml={5}>
          <Text color="white" fontSize="md">
            {data.name}
          </Text>
          <HStack alignItems="center">
            {statusIcon}
            <Text color="gray.200" fontSize="xs" ml={1}>
              {data.status}
            </Text>
          </HStack>
        </VStack>

        <Avatar
          h={12}
          w={12}
          mr={5}
          bg="gray.600"
          alignSelf="center"
          size="md"
          source={{ uri: data.picture }}
          {...rest}
        />
      </HStack>
    </VStack>
  );
}
