import {
  VStack,
  HStack,
  Stack,
  Heading,
  Icon,
  useTheme,
  Text,
  Center,
  Box,
  Button as BtnSignIn,
  Divider,
} from "native-base";
import * as AuthSession from "expo-auth-session";
import { useNavigation } from "@react-navigation/native";

import Logo from "../assets/logo_little.svg";
import { GoogleLogo, FacebookLogo } from "phosphor-react-native";
import { Button } from "../components/Button";
import { ButtonSignIn } from "../components/ButtonSignIn";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

type AuthResponse = {
  type: string;
  params: {
    access_token: string;
  };
};

export function SignIn() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  async function handleSignIn() {
    const RESPONSE_TYPE = "token";
    const SCOPE = encodeURI("profile email");

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    const { type, params } = (await AuthSession.startAsync({
      authUrl,
    })) as AuthSession;

    if (type === "success") {
      //navigation.navigate('userInformation', { token: params.access_token });
      //navigation.navigate("homeMotoboy", { token: params.access_token });
      navigation.navigate("homeRestaurant", { token: params.access_token });
    }
  }

  return (
    <Center height="full" bg="gray.600">
      <Logo />
      <Box width="full" p={6}>
        <Text color="white" textAlign="center" fontSize="xl" mt={3} mb={3}>
          Acesse sua conta
        </Text>
        <Box width="full" mt={4}>
          <BtnSignIn
            bg="gray.650"
            h={14}
            fontSize="sm"
            rounded="sm"
            _pressed={{ bg: "gray.700" }}
            onPress={handleSignIn}
          >
            <HStack height="full" alignItems="center" justifyContent="center">
              <Icon as={<GoogleLogo color={colors.primary[700]} size={32} />} />
              <Divider
                height="full"
                thickness="2"
                bg="primary.700"
                h="full"
                mx="4"
                orientation="vertical"
              />
              <Heading color="primary.700" fontSize="lg">
                Entrar com Google
              </Heading>
            </HStack>
          </BtnSignIn>
        </Box>
      </Box>
    </Center>
  );
}
