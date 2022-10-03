import React, { useState } from 'react';
import { VStack, HStack, Box, IconButton, Heading, useTheme, Text, FlatList, Center, Icon } from 'native-base';
import { Button } from '../components/Button';
import { Filter } from '../components/Filter';
import { HeaderProfile } from '../components/HeaderProfile';

import IconMoto from '../assets/icon-moto.svg';

export function HomeRestaurant() {
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState([])
  const { colors } = useTheme();
  
  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HeaderProfile url="https://github.com/mateusp23.png" title="Panela de Ferro" />

      <VStack flex={1} px={6}>
        <HStack space={3} mb={8} mt={8}>
          <Filter
            type="open"
            title="Lista de Motoboys"
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />
          <Filter 
            type="closed"
            title="Finalizados"
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>

        <FlatList 
          data={orders}
          //keyExtractor={item => item.id}
          //renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center>
              <Icon as={<IconMoto size={32} />} />
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                Não há {'\n'}
                {statusSelected === 'open' ? 'entregadores no momento' : 'entregas finalizadas'}
              </Text>
            </Center>
          )}
        />

        <Button bgColor="primary.700" title="Minhas informações" color="white" mb={5} />
      </VStack>
    </VStack>
  );
}