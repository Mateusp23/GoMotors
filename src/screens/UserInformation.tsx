import React from 'react';
import { VStack } from 'native-base';
import { Header } from '../components/Header';

export function UserInformation() {
  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header isBackScreen={false} title="Informe sua atuação" />
    </VStack>    
  );
}