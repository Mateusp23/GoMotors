import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import {
  Center, FlatList, Heading, HStack, Icon, Text, VStack
} from "native-base";
import React, { useEffect, useState } from "react";
import { Filter } from "../components/Filter";

import IconMoto from "../assets/icon-moto.svg";

import { Button } from "../components/Button";
import { HeaderProfile } from "../components/HeaderProfile";
import { OrderListRestaurants } from '../components/OrderListRestaurants';

export function HomeMotoboy() {
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );
  const [ordersListRestaurant, setOrdersListRestaurant] =
    useState([]);
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const subscribe = firestore()
      .collection('users')
      .where('selectTypeUser', '==', 'restaurant')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        });

        setOrdersListRestaurant(data);
        console.log(data);
      });

    return () => subscribe();
  }, [])

  const handleNewScreen = () => {
    navigation.navigate("editMotoboy");
  };

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HeaderProfile
        url="https://avatars.githubusercontent.com/u/61236430?v=4"
        title="Mateus"
        userType="motoboy"
      />

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading fontSize="lg" color="gray.100">
            Solicitações de entrega
          </Heading>

          <Text color="gray.200">2</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="Em andamento"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />
          <Filter
            type="finished"
            title="Finalizados"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>

        <FlatList
          data={ordersListRestaurant}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <OrderListRestaurants
              data={item}
              onPress={() => {}}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center>
              <Icon as={<IconMoto size={32} />} />
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                Você ainda não possui {"\n"}
                entregas{" "}
                {statusSelected === "open" ? "em andamento" : "finalizadas"}
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
