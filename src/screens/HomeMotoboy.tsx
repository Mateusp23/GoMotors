import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import {
  Center, HStack, Icon, Text, VStack
} from "native-base";
import React, { useState } from "react";
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
  complement: string;
  nameRestaurant: string;
  value: string;
  date: string;
};

export function HomeMotoboy({ route }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const params = route?.params;
  console.log('id params***: ', params?.userData.id);
  console.log('status: ', params?.userData.status);
  const [deliveries, setDeliveries] = useState<Deliveries>({} as Deliveries);
  const [isDeliveries, setIsDeliveries] = useState(false);
  const navigation = useNavigation();

  const handleCloseDeliveries = () => {
    if (deliveries) {
      Alert.alert('Entrega', 'Entrega aceita com sucesso');
    } 
    setIsDeliveries(false);
    // limpar objeto setDeliveries()
  }

  const handleFinishDeliveries = () => {
    Alert.alert("Entrega", "Tem certeza que deseja recusar a entrega?", [
      {
        text: "Cancelar",
        onPress: () => {
          return;
        },
      },
      {
        text: "Recusar",
        onPress: () => {
          console.log('recusou');
          setIsDeliveries(false);
        },
      },
    ]);
  }

  const handleNewScreen = () => {
    navigation.navigate("editMotoboy", { id: params.userData?.id });
  };
  
  const handleShowDeliveries = () => {
    setIsLoading(true);

    firestore()
      .collection('deliveries')
      .doc(params?.userData.id)
      .get()
      .then((doc) => {
        const {
          road,
          district,
          complement,
          isCitySelected,
          typeDelivery,
          restaurantData,
          value,
          created_at
        } = doc.data();

        setDeliveries({
          road,
          district,
          complement,
          isCitySelected,
          nameRestaurant: restaurantData,
          typeDelivery,
          value,
          date: dateFormat(created_at),
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        return Alert.alert(
          'Entrega',
          'Você ainda não possui entregas. Aguarde para receber uma!!'
        );
      });    
      console.log(deliveries)
      // if (!deliveries) {
      //   setIsDeliveries(true);
      // } 
    setIsDeliveries(true);
    setIsLoading(false);
  }

  const handleIsDeliveries = () => {
    if (deliveries) {
      return <OrderListDeliveries
        restaurantData={deliveries?.nameRestaurant?.name}
        road={deliveries?.road}
        district={deliveries?.district}
        complement={deliveries?.complement}
        isCitySelected={deliveries?.isCitySelected}
        typeDeliveries={deliveries?.typeDelivery}
        value={`R$ ${deliveries?.value}`}
        closeDeliveries={handleCloseDeliveries}
        closeDeliveriesFinish={handleFinishDeliveries}
        titleBtnFinish="Fechar"
        titleBtn="Aceitar entrega"
      />
    } else {
      return <OrderListDeliveries
        restaurantData="Nome do restaurante: -"
        road="-"
        district="-"
        complement="-"
        isCitySelected="-"
        typeDeliveries="-"
        value="R$ -"
        closeDeliveries={handleCloseDeliveries}
        titleBtn="Fechar"
      />
    }
  }

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
          
          {isDeliveries && <Text fontSize="lg" mb={2} color='white'>{ deliveries ? "1" : "0"}</Text>}
        </HStack>

        <Button
          mt={2}
          mb={2}
          title='Ver entrega'
          bgColor="primary.700"
          color="white"
          bg="gray.700"
          isLoading={isLoading}
          onPress={handleShowDeliveries}
        />

        {isDeliveries ?
          // todo se tiver deliverie mostrar orderList com dados do firebase se nao tiver deliveries mostrar dados vazios
          handleIsDeliveries()
          : 
          <VStack space={4} alignItems="center">  
            <Center>
              <Icon as={<IconMoto />} mt={4} />
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                Ser motoqueiro é muito mais {"\n"}
                do que ter uma moto!
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
