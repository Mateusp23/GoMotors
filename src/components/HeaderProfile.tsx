import {
  HStack,
  Avatar,
  useTheme,
  Heading,
  IAvatarProps,
  IconButton,
} from "native-base";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { SignOut } from "phosphor-react-native";

type HeaderProfileProps = IAvatarProps & {
  title: string;
  url: string;
};

export function HeaderProfile({ title, url, ...rest }: HeaderProfileProps) {
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
        <Avatar
          bg="gray.600"
          alignSelf="center"
          size="md"
          source={{ uri: url }}
          {...rest}
        />
        <Heading ml={4} fontSize="md" color={colors.white}>
          Olá, {title}
        </Heading>
      </HStack>
      <IconButton
        icon={<SignOut size={26} color={colors.gray[300]} />}
        onPress={handleLogout}
      />
    </HStack>
  );
}
