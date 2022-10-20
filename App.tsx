import React from "react";
import { AuthProvider } from "./src/context/auth";
import { THEME } from "./src/styles/theme";
import { NativeBaseProvider, StatusBar, Heading } from "native-base";
import {
  useFonts,
  Raleway_400Regular,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import { NavigationContainer } from "@react-navigation/native";

import { Loading } from "./src/components/Loading";

import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <NavigationContainer>
        <AuthProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          {fontsLoaded ? <Routes /> : <Loading />}
        </AuthProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
