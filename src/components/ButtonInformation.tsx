import React, { useState, useEffect } from "react";
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
import { ForkKnife, House, CaretDown } from "phosphor-react-native";
import IconMotoSignIn from "../assets/icon-moto-sign-in.svg";
import IconLogoInformation from "../assets/logo-screen-info.svg";
import { Button } from "./Button";

export type Params = {
  token: string;
};

export type Profile = {
  name: string;
  email: string;
  family_name: string;
  given_name: string;
  picture: string;
};

export function ButtonInformation() {
  const [profile, setProfile] = useState({} as Profile);
  const [isButtonSelected, setIsButtonSelected] = useState(false);
  const [isCitySelected, setIsCitySelected] = useState("");
  const route = useRoute();
  const navigation = useNavigation();
  const { colors } = useTheme();

  const { token } = route.params as Params;

  const handleShowInfos = () => {
    setIsButtonSelected(true);
  };

  const handleShowCities = () => {
    setIsCitySelected(true);
  };

  const handleNewScreen = () => {
    //navigation.navigate('homeMotoboy');
    navigation.navigate("homeRestaurant", { token });
  };

  async function loadProfile() {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${token}`
    );
    const userInfo = await response.json();

    setProfile(userInfo);
    console.log("user: ", profile);
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <>
      <ButtonInfo
        bg="primary.700"
        h={14}
        fontSize="sm"
        rounded="sm"
        _pressed={{ bg: "primary.400" }}
        justifyContent="space-between"
        mb={4}
        onPress={handleShowInfos}
      >
        <HStack width="full" space={48} alignItems="center">
          <Heading fontSize="md" color={colors.white}>
            Entregador
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
        onPress={handleShowInfos}
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
    </>
  );
}
