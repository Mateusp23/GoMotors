import firestore from '@react-native-firebase/firestore';
import { VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Forms/Input";
import { Header } from "../components/Header";

type Details = {
  deliveries: string;
  phone: string;
  pix: string;
  experience: string;
};

type RouteParams = {
  id: string;
}

export function EditMotoboy({ route }: any) {
  const params = route?.params as RouteParams;
  const [details, setDetails] = useState<Details>({} as Details);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState('');
  
  const [deliveries, setDeliveries] = useState('');
  const [phone, setPhone] = useState('');
  const [pix, setPix] = useState('');
  const [experience, setExperience] = useState('');

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
          experience,
        } = doc.data();

        setDetails({
          deliveries,
          phone,
          pix,
          experience,
        });
        setIsLoading(false);
      });
    
  }, [userId]);

  console.log('detalhes', details);
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
        onPress={() => {}}
      />
    </VStack>
  );
}
