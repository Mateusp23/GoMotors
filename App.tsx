import React from 'react';
import { THEME } from './src/styles/theme';
import { NativeBaseProvider, StatusBar, Heading } from 'native-base';
import { useFonts, Raleway_400Regular, Raleway_700Bold } from '@expo-google-fonts/raleway';
import { Splash } from './src/screens/Splash';
import { Loading } from './src/components/Loading';

export default function App() {
  let [fontsLoaded] = useFonts({
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
      { fontsLoaded ? <Splash /> : <Loading /> }
    </NativeBaseProvider>
  );
}
