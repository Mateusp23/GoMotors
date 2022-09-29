import React from 'react';
import { VStack, Box } from 'native-base';
import { Header } from '../components/Header';

export function HomeMotoboy() {
  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header isBackScreen title="home motoboy" />
    </VStack>    
  );
}