import auth from "@react-native-firebase/auth";
import {
  HStack, IAvatarProps,
  IconButton, Text, useTheme, VStack
} from "native-base";

import { SignOut } from "phosphor-react-native";
import { Alert } from "react-native";

type HeaderProfileProps = IAvatarProps & {
  title: string;
  userType: "restaurante" | "motoboy";
};

export function HeaderProfile({
  title,
  userType,
  ...rest
}: HeaderProfileProps) {
  const { colors } = useTheme();

  function handleLogout() {
    Alert.alert("Sair", "Tem certeza que deseja sair da aplicação?", [
      {
        text: "Cancelar",
        onPress: () => {
          return;
        },
      },
      {
        text: "Sair",
        onPress: () => {
          auth()
            .signOut()
            .catch((error) => {
              console.log(error);
              return Alert.alert("Sair", "Não foi possível sair.");
            });
        },
      },
    ]);
  }

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.600"
      pt={12}
      pb={5}
      px={6}
    >
      <HStack justifyContent="center" alignItems="center">
        <VStack>
          <Text ml={4} fontSize="md" bold color="white" >
            {title}
          </Text>
          <Text ml={4} textTransform="uppercase" fontSize="md" color={colors.gray[300]} >
            {userType}
          </Text>
        </VStack>
      </HStack>
      <IconButton
        icon={<SignOut size={26} color={colors.gray[300]} />}
        onPress={handleLogout}
      />
    </HStack>
  );
}
