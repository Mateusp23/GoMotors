import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import {
  Center, FlatList, Heading, HStack, Icon, Text, VStack
} from "native-base";
import React, { useEffect, useState } from "react";

import IconMoto from "../assets/icon-moto.svg";

import { Button } from "../components/Button";
import { HeaderProfile } from "../components/HeaderProfile";
import { Loading } from '../components/Loading';
import { OrderListRestaurants } from '../components/OrderListRestaurants';

export function HomeMotoboy({ route }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const params = route?.params;
  console.log('id: ', params?.userData.id);
  const [userId, setUserId] = useState('');
  const [deliveries, setDeliveries] = useState([]);
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">("open");
  const [ordersListRestaurant, setOrdersListRestaurant] =
    useState([]);
  const navigation = useNavigation();

  const handleNewScreen = () => {
    navigation.navigate("editMotoboy", { id: params.userData?.id });
  };
  
  useEffect(() => {
    setIsLoading(true);
    setUserId(params?.userData.id);

    const subscriber = firestore()
      .collection('deliveries')
      //.where('orderIdMotoboy', '==', userId)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const { road, district, isCitySelected, typeDelivery, value, created_at } = doc.data();

          return {
            road,
            district,
            isCitySelected,
            typeDelivery,
            value,
            created_at
          }
        });
        
        setDeliveries(data);
        setIsLoading(false);
      });

    return subscriber;
  }, [userId]);
  console.log('entregas: ', deliveries);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HeaderProfile
        title={`Olá, ${params?.userData.name}`}
        userType={params?.userData.selectTypeUser}
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

        {isLoading ? <Loading /> : 
          <FlatList
            data={ordersListRestaurant}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <OrderListRestaurants
                data={item}
                onPress={() => { }}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <Center>
                <Icon as={<IconMoto />} mt={4} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Você ainda não possui {"\n"}
                  entregas{" "}
                  {statusSelected === "open" ? "em andamento" : "finalizadas"}
                </Text>
              </Center>
            )}
          />
        }

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
