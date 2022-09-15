import React from 'react';
import { THEME } from './src/styles/theme';
import { NativeBaseProvider, StatusBar, Text } from 'native-base';
import { useFonts, Raleway_400Regular, Raleway_700Bold } from '@expo-google-fonts/raleway';

export default function App() {
  let [fontsLoaded] = useFonts({
    Raleway_400Regular, 
    Raleway_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Text color="black" textAlign="center" mt={8}>
        GoMotors!
      </Text>
    </NativeBaseProvider>
  );
}
