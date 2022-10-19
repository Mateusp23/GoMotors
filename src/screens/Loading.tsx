import React, { useState, useEffect } from "react";
import { UserInformation } from "../screens/UserInformation";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { VStack } from "native-base";
import { Loading as Loader } from "../components/Loading";

//tela de verificação
export function Loading() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <VStack flex={1} alignItems="center" bg="gray.700" px={8} pt={24}>
      <Loader />
    </VStack>
  );
}
