import { Stack, Icon, Button as ButtonSignIn} from "native-base";

import IconGoogle from "../assets/icon-google.svg";

export function ButtonSignIn() {
  return (
    <Stack direction={{
      base: "column",
      md: "row"
    }} space={4}>
      <ButtonSignIn 
        bg="primary.700"
        h={14}
        fontSize="sm"
        rounded="sm"
        _pressed={{ bg: "primary.400" }}
        leftIcon={<IconGoogle />}
      >
        Entrar com Google
      </ButtonSignIn>
    </Stack>
  );
}