import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView, Select, Text, useTheme, VStack } from "native-base";

import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Forms/Input";
import { Header } from "../components/Header";

type RouteParams = {
  orderIdMotoboy: string;
}

type MotoboyInfosListProps = {
  id: string;
  name: string;
  phone: string;
  experience: string;
  status: string;
  pix: string;
  citySelected: string;
  created_at: FirebaseFirestoreTypes.Timestamp;
}

// tela vai ser chamada quando for clicada no motoboy na listagem da home do restaurante
export function MotoboyDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCitySelected, setIsCitySelected] = useState("torres");
  const [road, setRoad] = useState('');
  const [district, setDistrict] = useState('');
  const [complement, setComplement] = useState('');
  const [typeDelivery, setTypeDelivery] = useState('');
  const [value, setValue] = useState('');
  const { colors } = useTheme();
  const navigation = useNavigation();
  
  const [motoboyInfosList, setMotoboyInfosList] =
    useState<MotoboyInfosListProps>({} as MotoboyInfosListProps);
  const route = useRoute();
  const { orderIdMotoboy } = route.params as RouteParams;

  function handleNewDelivery() {
    if (!road || !district || !complement || !typeDelivery || !value) {
      return Alert.alert("Envio da entrega", "Preencha todos os campos.");
    }
    setIsLoading(true);

    firestore()
      .collection('deliveries')
      .add({
        road,
        district,
        complement,
        typeDelivery,
        value,
        isCitySelected,
        orderIdMotoboy,
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert('Entrega', 'Solicitação de entrega enviada com sucesso');
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        return Alert.alert(
          'Entrega',
          'Não foi possível registrar a entrega.'
        );
      });
  }

  useEffect(() => { 
    setIsLoading(true);

    firestore()
      .collection('users')
      .doc(orderIdMotoboy)
      .get()
      .then((doc) => {
        const {
          name,
          phone,
          experience,
          status,
          pix,
          citySelected,
          created_at
        } = doc.data();

        setMotoboyInfosList({
          id: doc.id,
          name,
          phone,
          experience,
          status,
          pix,
          citySelected,
          created_at
        });
        setIsLoading(false);
      });
    }, []);
    console.log('dados:', motoboyInfosList)

  return (
    <VStack flex={1} p={5} bg="gray.700">
      <ScrollView bg="gray.700" w="full" showsVerticalScrollIndicator={false}>
        <Header isBackScreen title="Detalhes do Motoboy" />

        <Text color="white" mb={4} fontSize="md" >{motoboyInfosList?.name}</Text>
        <Text color="white" mb={4} fontSize="md" >{motoboyInfosList?.phone}</Text>
        <Text color="white" mb={4} fontSize="md" >{motoboyInfosList?.experience}</Text>
        <Text color="white" mb={4} fontSize="md" >{motoboyInfosList?.status}</Text>
        <Text color="white" mb={4} textTransform="uppercase" fontSize="md" >{motoboyInfosList?.citySelected}</Text>
        <Text color="white" fontSize="md" >{motoboyInfosList?.pix}</Text>

        <Header isBackScreen={false} title="Envio da Entrega" />

        <Select
          selectedValue={isCitySelected}
          minWidth="200"
          accessibilityLabel="Selecione uma cidade"
          placeholder="Selecione uma cidade"
          _selectedItem={{
            color: "primary.700",
          }}
          placeholderTextColor={colors.primary[700]}
          color={colors.primary[700]}
          fontSize="md"
          mt={6}
          onValueChange={(itemValue) => setIsCitySelected(itemValue)}
          defaultValue={isCitySelected}
        >
          <Select.Item shadow={1} label="Torres - RS" value="torres" />
          <Select.Item shadow={1} label="Passo de Torres - RS" value="passo" />
        </Select>

        <Input onChangeText={setRoad} bg="gray.600" type="text" placeholder="Rua" mt={5}/>
        <Input onChangeText={setDistrict} bg="gray.600" placeholder="Bairro" mt={3}/>
        <Input onChangeText={setComplement} bg="gray.600" placeholder="Complemento" mt={3} />
        <Input
          onChangeText={setTypeDelivery}
          bg="gray.600"
          placeholder="Tipo de entrega: Ex pizza, fritas..."
          mt={3}
        />
        <Input
          onChangeText={setValue}
          bg="gray.600"
          placeholder="Valor da entrega: Ex R$ 12,00"
          mt={3}
        />
        <Button
          bgColor="primary.700"
          color="white"
          title="Solicitar entrega"
          mt={4}
          mb={4}
          isLoading={isLoading}
          onPress={handleNewDelivery}
        />
      </ScrollView>
    </VStack>
  );
}
