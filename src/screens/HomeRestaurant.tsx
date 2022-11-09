import firestore from '@react-native-firebase/firestore';
import {
  Center, FlatList, Heading, HStack, Icon, Text, VStack
} from "native-base";
import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Filter } from "../components/Filter";
import { HeaderProfile } from "../components/HeaderProfile";

import { useNavigation } from "@react-navigation/native";

import IconMoto from "../assets/icon-moto.svg";
import {
  OrderListMotoboys,
  OrderMotoboyListProps
} from "../components/OrderListMotoboys";

export function HomeRestaurant() {
  const [statusSelected, setStatusSelected] = useState<'Em entrega' | 'Finalizada'>(
    'Em entrega'
  );
  const [ordersListMotoboy, setOrdersListMotoboy] =
    useState<OrderMotoboyListProps>([]);
  
  const navigation = useNavigation();
  

  const handleNewScreen = () => {
    navigation.navigate("editRestaurant");
  };

  // function handleOpenDetails(orderId: string) {
  //   navigation.navigate('details', { orderId });
  // .where('status', '==', statusSelected)
  // }

  function handleOpenMotoboyDetails() {
    navigation.navigate("motoboyDetails");
  }

  // function handleFinishedDeliveries() {
  //   setStatusSelected("Finalizada");
    
  //   const subscribe = firestore()
  //     .collection('users')
  //     .where('status', '==', 'Finalizada')
  //     .onSnapshot(querySnapshot => {
  //       const data = querySnapshot.docs.map((doc) => {
  //         return {
  //           id: doc.id,
  //           ...doc.data()
  //         }
  //       }) as OrderMotoboyListProps[];
  //       setOrdersListMotoboy(data);
  //     });

  //   return () => subscribe();
  // }

  useEffect(() => {
    const subscribe = firestore()
      .collection('users')
      .where('selectTypeUser', '==', 'motoboy')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as OrderMotoboyListProps[];

        setOrdersListMotoboy(data);
      });

    return () => subscribe();
  }, []);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HeaderProfile
        url="https://avatars.githubusercontent.com/u/61236430?v=4"
        title="Mateus"
        userType="restaurante"
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
            type="Em entrega"
            title="Lista de Motoboys"
            onPress={() => setStatusSelected('Em entrega')}
            isActive={statusSelected === "Em entrega"}
          />
          <Filter
            type="Finalizada"
            title="Entregas Finalizadas"
            isActive={statusSelected === "Finalizada"}
            onPress={() => setStatusSelected("Finalizada")}
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
