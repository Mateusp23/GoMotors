import React from 'react';
import { VStack, Box } from 'native-base';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { ButtonInformation } from '../components/ButtonInformation';

export function UserInformation() {
  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header isBackScreen={false} title="Informe sua atuação" />
      <Box width="full">
        <ButtonInformation />
      </Box>
    </VStack>    
  );
}