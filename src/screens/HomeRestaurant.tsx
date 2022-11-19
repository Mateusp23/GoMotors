import firestore from '@react-native-firebase/firestore';
import {
  Center, FlatList, Heading, HStack, Icon, Text, VStack
} from "native-base";
import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { HeaderProfile } from "../components/HeaderProfile";

import { useNavigation } from "@react-navigation/native";

import IconMoto from "../assets/icon-moto.svg";
import { Loading } from '../components/Loading';
import {
  OrderListMotoboys,
  OrderMotoboyListProps
} from "../components/OrderListMotoboys";

type RouteParams = {
  email: any;
}

export function HomeRestaurant() {
  const [isLoading, setIsLoading] = useState(true);
  const [statusSelected, setStatusSelected] = useState<'Em entrega' | 'Finalizada'>(
    'Em entrega'
  );
  const [ordersListMotoboy, setOrdersListMotoboy] =
    useState<OrderMotoboyListProps[]>([]);
  
  const navigation = useNavigation();

  const handleNewScreen = () => {
    navigation.navigate("editRestaurant");
  };

  function handleOpenMotoboyDetails(orderIdMotoboy: string) {
    navigation.navigate('motoboyDetails', { orderIdMotoboy });
  }

  useEffect(() => {
    setIsLoading(true);

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
        setIsLoading(false);
      });

    return () => subscribe();
  }, []);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HeaderProfile
        url="https://avatars.githubusercontent.com/u/61236430?v=4"
        title=""
        userType="restaurante"
      />

      <VStack flex={1} px={6} mt={4}>
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

        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={ordersListMotoboy}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <OrderListMotoboys
                data={item}
                onPress={() => handleOpenMotoboyDetails(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            mt={4}
            ListEmptyComponent={() => (
              <Center>
                <Icon as={<IconMoto />} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Não há {"\n"}
                  {statusSelected === "Em entrega"
                    ? "entregadores no momento"
                    : "entregas finalizadas"}
                </Text>
              </Center>
            )}
          />
        )}
        
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
