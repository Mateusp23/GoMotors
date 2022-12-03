import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";

import { Select, useTheme, VStack } from "native-base";
import { Alert } from 'react-native';
import { Button } from "../components/Button";
import { Input } from "../components/Forms/Input";
import { Header } from "../components/Header";
import { Loading } from '../components/Loading';

type Details = {
  deliveries: string;
  phone: string;
  pix: string;
  status: "Disponivel" | "Em entrega";
  experience: string;
};

type RouteParams = {
  id: string;
}

export function EditMotoboy({ route }: any) {
  const params = route?.params as RouteParams;
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState<Details>({} as Details);
  const [userId, setUserId] = useState('');
  
  const [status, setStatus] = useState("");
  const [deliveries, setDeliveries] = useState("");
  const [phone, setPhone] = useState("");
  const [pix, setPix] = useState("");
  const [experience, setExperience] = useState("");

  const navigation = useNavigation();
  const { colors } = useTheme();

  function handleEditMotoboy() {
    firestore()
      .collection('users')
      .doc(userId)
      .update({
        deliveries,
        phone,
        status,
        pix,
        experience
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
          deliveries,
          phone,
          pix,
          status,
          experience,
        } = doc.data();

        setDetails({
          deliveries,
          phone,
          status,
          pix,
          experience,
        });
        setDeliveries(deliveries);
        setPhone(phone);
        setPix(pix);
        setExperience(experience);
        setStatus(status);
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <VStack flex={1} p={5} bg="gray.600">
      <Header isBackScreen title="Editar Perfil - Motoboy" />

      <Input
        type="text"
        placeholder="Quanto tempo ja realiza entregas?"
        isRequired
        defaultValue={details?.deliveries}
        onChangeText={setDeliveries}
      />
      
      <Input
        keyboardType="numeric"
        placeholder="Telefone"
        mt={3}
        onChangeText={setPhone}
        defaultValue={details?.phone}
      />

      <Input
        type="text"
        placeholder="Chave pix"
        mt={3}
        isRequired
        onChangeText={setPix}
        defaultValue={details?.pix}
      />

      <Select
        selectedValue={status}
        defaultValue={details?.status}
        minWidth="200"
        accessibilityLabel="Selecione seu status"
        placeholder="Altere seu status"
        _selectedItem={{
          color: "primary.700",
        }}
        _item={colors.primary}
        placeholderTextColor={colors.primary[700]}
        color={colors.primary[700]}
        fontSize="md"
        mt={3}
        mb={3}
        onValueChange={(itemValue) => setStatus(itemValue)}
      >
        <Select.Item shadow={1} label="Disponível" value="Disponível" />
        <Select.Item shadow={1} label="Em entrega" value="Em entrega" />
      </Select>

      <Input
        placeholder="Conte um pouco de sua experiência"
        type="text"
        flex={1}
        mt={3}
        multiline
        textAlignVertical="top"
        onChangeText={setExperience}
        defaultValue={details?.experience}
      />

      <Button
        bgColor="primary.700"
        color="white"
        title="Confirmar"
        mt={4}
        mb={4}
        onPress={handleEditMotoboy}
      />
    </VStack>
  );
}
