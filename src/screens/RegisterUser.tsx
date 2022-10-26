import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import {
  HStack,
  VStack,
  Text,
  Heading,
  Icon,
  useTheme,
  ScrollView,
  Button as ButtonInfo,
} from "native-base";

import IconMotoSignIn from "../assets/icon-moto-sign-in.svg";
import IconLogoInformation from "../assets/logo-screen-info.svg";

import { ForkKnife, House, CaretDown } from "phosphor-react-native";
import { Input } from "../components/Forms/Input";
import { Alert } from "react-native";
import { Envelope, Key, User } from "phosphor-react-native";
import { Button } from "../components/Button";
import { Header } from "../components/Header";

export function RegisterUser() {
  const [deliveries, setDeliveries] = useState('');
  const [phone, setPhone] = useState('');
  const [pix, setPix] = useState('');
  const [experience, setExperience] = useState('');

  const [road, setRoad] = useState("");
  const [district, setDistrict] = useState("");
  const [complement, setComplement] = useState("");
  const [description, setDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isButtonSelected, setIsButtonSelected] = useState(false);
  const [selectTypeUser, setSelectTypeUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleSendMotoboy = () => {
    // enviar value motoboy para o userType
    setSelectTypeUser("motoboy");
    setIsButtonSelected(true);
  };

  const handleSendRestaurant = () => {
    // enviar value restaurant para o userType
    setSelectTypeUser("restaurant");
    setIsButtonSelected(true);
  };

  function handleNewAccount() {
    if(!email || !password || !name || !deliveries || !phone || !pix || !experience
      || !road || !district || !complement || !description) 
      {
        return Alert.alert("Entrar", "Preencha todos os campos.");
    }
   
    setIsLoading(true);

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert("Conta", "Cadastrado com sucesso!");
        firestore().collection("usersList").add({
          name,
          email,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
        navigation.goBack();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }
  
  const RenderData = () => {
    return (
      <>
        <Input
          mb={4}
          placeholder="E-mail"
          onChangeText={setEmail}
        />
        <Input
          mb={4}
          placeholder="Senha"
          secureTextEntry
          onChangeText={setPassword}
        />
        <Button
          title="Cadastrar"
          w="full"
          bgColor="primary.700"
          color="white"
          onPress={handleNewAccount}
          isLoading={isLoading}
        />
      </>
    );
  }

  const RenderForms = () => {
    if(isButtonSelected && selectTypeUser === "motoboy") {
      return (
        <>
          <Input
            mb={4}
            placeholder="Nome"
            onChangeText={setName}
          /> 
          <Input
            type="text"
            placeholder="Quanto tempo ja realiza entregas?"
            isRequired
            onChangeText={setDeliveries}
          />
          <Input keyboardType="numeric" placeholder="Telefone" mt={3} onChangeText={setPhone} />

          <Input type="text" placeholder="Chave pix" mt={3} isRequired onChangeText={setPix}/>
          <Input
            placeholder="Conte um pouco de sua experiência"
            type="text"
            flex={1}
            mt={3}
            mb={3}
            multiline
            textAlignVertical="top"
            onChangeText={setExperience}
          />
          <RenderData />        
        </>
      );
    } else if(isButtonSelected && selectTypeUser === "restaurant") {
      return (
        <>
          <Input
            mb={4}
            placeholder="Nome"
            onChangeText={setName}
          />
          <Input type="text" placeholder="Rua" isRequired onChangeText={setRoad} />
          <Input
            placeholder="Bairro"
            mt={3}
            isRequired
            onChangeText={setDistrict}
          />
          <Input
            placeholder="Complemento"
            mt={3}
            isRequired
            onChangeText={setComplement}
          />
          <Input
            placeholder="Conte sua história no mercado, qual ramo trabalha..."
            type="text"
            flex={1}
            mt={3}
            mb={3}
            multiline
            textAlignVertical="top"
            onChangeText={setDescription}
          />
          <RenderData />
        </>
      );
    } else {
      return <></>
    }
  }

  return (
    <VStack flex={1} alignItems="center" px={8} pt={8} bg="gray.600">
      <ScrollView bg="gray.600" w="full" showsVerticalScrollIndicator={false}>
        <Header isBackScreen title="Realize seu cadastro" />

        <ButtonInfo
          bg="primary.700"
          h={14}
          fontSize="sm"
          rounded="sm"
          _pressed={{ bg: "primary.400" }}
          justifyContent="space-between"
          mb={4}
          onPress={handleSendMotoboy}
        >
          <HStack width="full" space={48} alignItems="center">
            <Heading fontSize="md" color={colors.white}>
              Motoboy
            </Heading>
            <Icon as={<IconMotoSignIn color={colors.white} size={32} />} />
          </HStack>
        </ButtonInfo>

        <ButtonInfo
          bg="primary.700"
          h={14}
          fontSize="sm"
          rounded="sm"
          _pressed={{ bg: "primary.400" }}
          justifyContent="space-between"
          mb={6}
          endIcon={
            <Icon as={<ForkKnife color={colors.white} size={32} />} ml={32} />
          }
          onPress={handleSendRestaurant}
        >
          <Heading fontSize="md" color={colors.white}>
            Estabelecimento
          </Heading>
        </ButtonInfo>

        <RenderForms />        
      </ScrollView>
    </VStack>
  );
}
