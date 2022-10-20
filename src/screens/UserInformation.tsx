import React, { useState, useEffect, useCallback } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Button as ButtonInfo,
  Heading,
  Icon,
  useTheme,
  HStack,
  Box,
  VStack,
  Text,
  Checkbox,
  Select,
} from "native-base";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/auth";

import IconMotoSignIn from "../assets/icon-moto-sign-in.svg";
import IconLogoInformation from "../assets/logo-screen-info.svg";

import { ForkKnife, House, CaretDown } from "phosphor-react-native";

export type Profile = {
  name: string;
  email: string;
  family_name: string;
  given_name: string;
  picture: string;
};

const { KEY_STORAGE_TYPE_USER } = process.env;

export function UserInformation() {
  const { setUserType } = useAuth();
  const [profile, setProfile] = useState({} as Profile);
  const [selectTypeUser, setSelectTypeUser] = useState("");
  const [isButtonSelected, setIsButtonSelected] = useState(false);
  const [isCitySelected, setIsCitySelected] = useState("");
  const navigation = useNavigation();
  const { colors } = useTheme();

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

  const handleShowCities = () => {
    setIsCitySelected(true);
  };

  const handleNewScreen = useCallback(async () => {
    await AsyncStorage.setItem(KEY_STORAGE_TYPE_USER, selectTypeUser);
    setUserType(selectTypeUser);
  }, [selectTypeUser]);

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header isBackScreen={false} title="Informe sua atuação" />
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

      {isButtonSelected && (
        <VStack width="full">
          <Heading color="white" textAlign="center" fontSize="xl">
            Informe sua cidade de atuação
          </Heading>

          <Select
            selectedValue={isCitySelected}
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
            mt={6}
            onValueChange={(itemValue) => setIsCitySelected(itemValue)}
          >
            <Select.Item shadow={1} label="Torres - RS" value="torres" />
            <Select.Item
              shadow={1}
              label="Passo de Torres - RS"
              value="passo"
            />
            <Select.Item shadow={1} label="Três Cachoeiras - RS" value="tc" />
            <Select.Item shadow={1} label="Capão da Canoa - RS" value="capao" />
          </Select>

          {isCitySelected && (
            <VStack
              mt={12}
              width="full"
              alignItems="center"
              justifyContent="center"
            >
              <IconLogoInformation />
              <Button
                bgColor="primary.700"
                color="white"
                title="Confirmar"
                mt={8}
                onPress={handleNewScreen}
              />
            </VStack>
          )}
        </VStack>
      )}
    </VStack>
  );
}
