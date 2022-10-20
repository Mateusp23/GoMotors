import {
  HStack,
  VStack,
  Avatar,
  useTheme,
  Heading,
  IAvatarProps,
  IconButton,
  Text,
} from "native-base";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { SignOut } from "phosphor-react-native";
import { useAuth } from "../context/auth";

const { KEY_STORAGE_TYPE_USER } = process.env;
import AsyncStorage from "@react-native-async-storage/async-storage";

type HeaderProfileProps = IAvatarProps & {
  title: string;
  url: string;
  userType: "restaurante" | "motoboy";
};

export function HeaderProfile({
  title,
  url,
  userType,
  ...rest
}: HeaderProfileProps) {
  const { setUserType } = useAuth();
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
            .then(async () => {
              await AsyncStorage.removeItem(KEY_STORAGE_TYPE_USER);
              setUserType("");
            })
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
        <Avatar
          bg="gray.600"
          alignSelf="center"
          size="md"
          source={{ uri: url }}
          {...rest}
        />
        <VStack>
          <Heading ml={4} fontSize="md" color={colors.white}>
            Olá, {title}
          </Heading>
          <Text ml={4} fontSize="md" color={colors.gray[300]}>
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
