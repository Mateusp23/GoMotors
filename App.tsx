import {
  Raleway_400Regular,
  Raleway_700Bold, useFonts
} from "@expo-google-fonts/raleway";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, StatusBar } from "native-base";
import React from "react";
import { AuthProvider } from "./src/context/auth";
import { THEME } from "./src/styles/theme";

import { Loading } from "./src/components/Loading";

import { LogBox } from "react-native";
import { Routes } from "./src/routes";

// Ignore all warnings
LogBox.ignoreAllLogs(true);

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
