import { VStack } from "native-base";
import React, { useState } from "react";
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