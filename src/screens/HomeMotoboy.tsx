import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  Center, HStack, Icon, Text, VStack
} from "native-base";
import React, { useEffect, useState } from "react";
import { Alert } from 'react-native';

import IconMoto from "../assets/icon-moto.svg";

import { Button } from "../components/Button";
import { HeaderProfile } from "../components/HeaderProfile";
import { Loading } from '../components/Loading';
import { OrderListDeliveries } from '../components/OrderListDeliveries';
import { dateFormat } from '../utils/firestoreDateFormat';

type Deliveries = {
  road: string;
  district: string;
  isCitySelected: string;
  typeDelivery: string;
  nameRestaurant: string;
  value: string;
  date: string;
};

export function HomeMotoboy({ route }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const params = route?.params;
  console.log('id: ', params?.userData.id);
  const [userId, setUserId] = useState('');
  const [deliveries, setDeliveries] = useState<Deliveries>({} as Deliveries);
  const [isDeliveries, setIsDeliveries] = useState(true);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const handleCloseDeliveries = () => {
    Alert.alert('Teste', 'cliquei');
    setIsDeliveries(false);
  }

  const handleNewScreen = () => {
    navigation.navigate("editMotoboy", { id: params.userData?.id });
  };
  
  // useEffect(() => {
  //   setIsLoading(true);
  //   setUserId(params?.userData.id);

  //   const subscriber = firestore()
  //     .collection('deliveries')
  //     //.where('orderIdMotoboy', '==', userId)
  //     .onSnapshot((snapshot) => {
  //       const data = snapshot.docs.map((doc) => {
  //         const { road, district, isCitySelected, typeDelivery, value, restaurantData, created_at } = doc.data();

  //         return {
  //           road,
  //           district,
  //           isCitySelected,
  //           typeDelivery,
  //           value,
  //           nameRestaurant: restaurantData,
  //           created_at
  //         }
  //       });
        
  //       setDeliveries(data);
  //       setIsLoading(false);
  //     });

  //   return subscriber;
  // }, [userId]);

  useEffect(() => {
    setUserId(params?.userData.id);
  }, [userId]);

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);

      firestore()
        .collection('deliveries')
        .doc(userId)
        .get()
        .then((doc) => {
          const {
            road,
            district,
            isCitySelected,
            typeDelivery,
            restaurantData,
            value,
            created_at
          } = doc.data();

          setDeliveries({
            road,
            district,
            isCitySelected,
            nameRestaurant: restaurantData,
            typeDelivery,
            value,
            date: dateFormat(created_at),
          });
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, [isFocused]);
  
  console.log('entregas: ', deliveries);
  console.log('userId: ', userId);
  // console.log(deliveries.nameRestaurant.name);

  if (isLoading) {
    return <Loading />;
  }

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
          <Text fontSize="lg" mb={2} color='white'>Solicitaçōes de entrega</Text>
          
          {isDeliveries && <Text fontSize="lg" mb={2} color='white'>1</Text>}
        </HStack>

        {isDeliveries && <Text fontSize="lg" mb={2} color='white'>Dados da entrega</Text>}
        {isDeliveries ?
          <OrderListDeliveries
            //restaurantData={deliveries.nameRestaurant.name}
            restaurantData='napole'
            road='av general oso testando line quebrada etc teste um dois tres'
            district='centro'
            complement='sala 03'
            isCitySelected='Torres'
            typeDeliveries='pizza'
            value={`R$ ${deliveries.value}`}
            closeDeliveries={handleCloseDeliveries}
          />
          : 
          <VStack space={4} alignItems="center">  
            <Center>
              <Icon as={<IconMoto />} mt={4} />
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                Você ainda não possui {"\n"}
                solicitaçōes de entrega
              </Text>
            </Center>
          </VStack>
        }

        <Button
          title="Editar"
          bgColor="gray.600"
          color="primary.700"
          bg="gray.700"
          mt={16}
          mb={5}
          onPress={handleNewScreen}
        />
      </VStack>
    </VStack>
  );
}
