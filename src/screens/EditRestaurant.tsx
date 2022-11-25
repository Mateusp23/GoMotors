import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import { VStack } from "native-base";
import { Alert } from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Forms/Input";
import { Header } from "../components/Header";
import { Loading } from '../components/Loading';

type Details = {
  road: string;
  district: string;
  complement: string;
  description: string;
};

type RouteParams = {
  id: string;
}

export function EditRestaurant({ route }: any) {
  const params = route?.params as RouteParams;
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [details, setDetails] = useState<Details>({} as Details);

  const [road, setRoad] = useState("");
  const [district, setDistrict] = useState("");
  const [complement, setComplement] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

  function handleEditRestaurant() {
    if (!road || !district || !complement || !description) {
      return Alert.alert("Editar", "Preencha os campos.");
    }

    firestore()
      .collection('users')
      .doc(userId)
      .update({
        road,
        district,
        complement,
        description
      })
      .then(() => {
        Alert.alert('Editar', 'Informaçōes alteradas com sucesso.');
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert('Editar', 'Erro ao editar informaçōes.');
        console.log(error);
      });

  }

  useEffect(() => {
    setUserId(params?.id);
    setIsLoading(true);

    firestore()
      .collection('users')
      .doc(userId)
      .get()
      .then((doc) => {
        const {
          road,
          district,
          complement,
          description,
        } = doc.data();

        setDetails({
          road,
          district,
          complement,
          description,
        });
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} p={5} bg="gray.600">
      <Header isBackScreen title="Editar Perfil - Restaurante" />

      <Input
        type="text"
        placeholder="Rua"
        isRequired
        onChangeText={setRoad}
        defaultValue={details?.road}
      />
      <Input
        placeholder="Bairro"
        mt={3}
        isRequired
        onChangeText={setDistrict}
        defaultValue={details?.district}
      />
      <Input
        placeholder="Complemento"
        mt={3}
        isRequired
        onChangeText={setComplement}
        defaultValue={details?.complement}
      />
      <Input
        placeholder="Conte sua história no mercado, qual ramo trabalha..."
        type="text"
        flex={1}
        mt={3}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
        defaultValue={details?.description}
      />
      <Button
        bgColor="primary.700"
        color="white"
        title="Confirmar"
        mt={4}
        mb={4}
        onPress={handleEditRestaurant}
      />
    </VStack>
  );
}
