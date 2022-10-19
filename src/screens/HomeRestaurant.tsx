import React, { useState, useEffect } from "react";
import {
  VStack,
  HStack,
  Box,
  IconButton,
  Heading,
  useTheme,
  Text,
  FlatList,
  Center,
  Icon,
} from "native-base";
import { Button } from "../components/Button";
import { Filter } from "../components/Filter";
import { HeaderProfile } from "../components/HeaderProfile";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "../context/auth";
import { Params, Profile } from "../components/ButtonInformation";

import IconMoto from "../assets/icon-moto.svg";
import {
  OrderListMotoboys,
  OrderMotoboyListProps,
} from "../components/OrderListMotoboys";

export function HomeRestaurant() {
  const [profile, setProfile] = useState({} as Profile);
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );
  const [ordersListMotoboy, setOrdersListMotoboy] =
    useState<OrderMotoboyListProps>([
      {
        id: "1",
        name: "Mateus Paulart",
        picture: "https://github.com/Mateusp23.png",
        status: "Disponível",
      },
      {
        id: "2",
        name: "Otávio Borges",
        picture: "https://github.com/otavioborgsm.png",
        status: "Em entrega",
      },
    ]);
  const { colors } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();

  const handleNewScreen = () => {
    navigation.navigate("editRestaurant");
  };

  // function handleOpenDetails(orderId: string) {
  //   navigation.navigate('details', { orderId });
  // }

  function handleOpenMotoboyDetails() {
    navigation.navigate("motoboyDetails");
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HeaderProfile
        url="https://avatars.githubusercontent.com/u/61236430?v=4"
        title="Mateus"
      />

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={3}
          mb={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Lista de motoboys</Heading>
          <Text color="gray.200">{ordersListMotoboy.length}</Text>
        </HStack>

        <HStack space={3} mb={8} mt={4}>
          <Filter
            type="open"
            title="Lista de Motoboys"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />
          <Filter
            type="closed"
            title="Entregas"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>

        <FlatList
          data={ordersListMotoboy}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OrderListMotoboys
              data={item}
              onPress={() => handleOpenMotoboyDetails()}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center>
              <Icon as={<IconMoto size={32} />} />
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                Não há {"\n"}
                {statusSelected === "open"
                  ? "entregadores no momento"
                  : "entregas finalizadas"}
              </Text>
            </Center>
          )}
        />

        <Button
          bgColor="primary.700"
          title="Minhas informações"
          color="white"
          mb={5}
          onPress={handleNewScreen}
        />
      </VStack>
    </VStack>
  );
}
