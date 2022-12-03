import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  Select, useTheme, VStack
} from "native-base";
import React, { useEffect, useState } from "react";

import { Alert } from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Forms/Input";
import { Header } from "../components/Header";

export function RegisterUser() {
  const [deliveries, setDeliveries] = useState("");
  const [phone, setPhone] = useState("");
  const [pix, setPix] = useState("");
  const [experience, setExperience] = useState("");
  const [status, setStatus] = useState("Disponivel");

  const [road, setRoad] = useState("");
  const [district, setDistrict] = useState("");
  const [complement, setComplement] = useState("");
  const [description, setDescription] = useState("");

  const [citySelected, setCitySelected] = useState("");
  const [selectTypeUser, setSelectTypeUser] = useState("");
  const [isButtonSelected, setIsButtonSelected] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { colors } = useTheme();
  const navigation = useNavigation();

  const selectedUserType = () => {
    if (selectTypeUser) {
      setIsButtonSelected(true);
    }
  }

  const handleNewAccount = () => {
    if(!email || !password || !name || !citySelected) {
        return Alert.alert("Entrar", "Preencha todos os campos.");
    }
   
    setIsLoading(true);

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        Alert.alert("Conta", "Cadastrado com sucesso!");
        firestore()
          .collection("users")
          .doc(response.user.uid)
          .set({
            //motoboy
            deliveries,
            phone,
            pix,
            experience,
            status,
            //restaurant 
            road,
            district,
            complement,
            description,
            selectTypeUser,
            citySelected,
            name,
            email,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
        navigation.navigate('signIn');
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }
  
  const RenderData = () => {
    return (
      <>
        <Select
          selectedValue={citySelected}
          minWidth="200"
          accessibilityLabel="Selecione uma cidade"
          placeholder="Selecione uma cidade"
          _selectedItem={{
            color: "primary.700",
          }}
          _item={colors.primary}
          placeholderTextColor={colors.primary[700]}
          color={colors.primary[700]}
          fontSize="md"
          mt={3}
          mb={3}
          onValueChange={(itemValue) => setCitySelected(itemValue)}
        >
          <Select.Item shadow={1} label="Torres - RS" value="torres" />
          <Select.Item shadow={1} label="Sombrio - SC" value="sombrio" />
          <Select.Item
            shadow={1}
            label="Passo de Torres - SC"
            value="passo"
          />
          <Select.Item shadow={1} label="Três Cachoeiras - RS" value="tc" />
          <Select.Item shadow={1} label="Capão da Canoa - RS" value="capao" />
        </Select>
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
          mb={8}
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
            onChangeText={setExperience}
          />

          <Select
            selectedValue={status}
            defaultValue={status}
            minWidth="200"
            accessibilityLabel="Selecione seu status"
            placeholder="Selecione seu status"
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
          </Select>

          {RenderData()}       
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
            placeholder="Conte sua história no mercado"
            type="text"
            mt={3}
            onChangeText={setDescription}
            value={description}
          />
          {RenderData()}
        </>
      );
    } else {
      return <></>
    }
  }

  useEffect(() => {
    selectedUserType();
  }, [isButtonSelected, selectTypeUser]);

  return (
    <VStack flex={1} alignItems="center" px={8} pt={8} bg="gray.600">
      <ScrollView bg="gray.600" w="full" showsVerticalScrollIndicator={false}>
        <Header isBackScreen title="Realize seu cadastro" />

        <Select
          selectedValue={selectTypeUser}
          minWidth="200"
          accessibilityLabel="Selecione sua atuação"
          placeholder="Selecione sua atuação"
          _selectedItem={{
            color: "primary.700",
          }}
          _item={colors.primary}
          placeholderTextColor={colors.primary[700]}
          color={colors.primary[700]}
          fontSize="md"
          mt={3}
          mb={3}
          onValueChange={(itemValue) => setSelectTypeUser(itemValue)}
        >
          <Select.Item shadow={1} label="Motoboy" value="motoboy" />
          <Select.Item shadow={1} label="Restaurante" value="restaurant" />
        </Select>

        {RenderForms()}          
      </ScrollView>
    </VStack>
  );
}
