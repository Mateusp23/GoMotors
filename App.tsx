import React from 'react';
import { THEME } from './src/styles/theme';
import { NativeBaseProvider, StatusBar, Heading } from 'native-base';
import { useFonts, Raleway_400Regular, Raleway_700Bold } from '@expo-google-fonts/raleway';

import { Loading } from './src/components/Loading';

import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Raleway_400Regular, 
    Raleway_700Bold
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      { fontsLoaded ? <Routes /> : <Loading /> }
    </NativeBaseProvider>
  );
}
