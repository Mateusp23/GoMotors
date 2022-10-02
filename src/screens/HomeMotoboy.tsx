import React, { useState } from 'react';
import { VStack, HStack, Box, IconButton, Heading, useTheme, Avatar, Text, FlatList, Center, Icon } from 'native-base';
import { Header } from '../components/Header';
import { Filter } from '../components/Filter';

import IconMoto from '../assets/icon-moto.svg';

import { SignOut } from 'phosphor-react-native';
import { Button } from '../components/Button';

export function HomeMotoboy() {
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState([])
  const { colors } = useTheme();

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      > 
        <Heading fontSize="md" color={colors.white}>Olá, Mateus</Heading>
        <Avatar bg="gray.600" alignSelf="center" size="md" source={{
          uri: "https://github.com/mateusp23.png"
        }}/>
      </HStack>

      <VStack flex={1} px={6}>
        <HStack 
          w="full" 
          mt={8} 
          mb={4} 
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading fontSize="lg" color="gray.100">
            Solicitações de entrega
          </Heading>

          <Text color="gray.200">
            2
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="Em andamento"
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
                Você ainda não possui {'\n'}
                entregas {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
              </Text>
            </Center>
          )}
        />

        <Button bgColor="primary.700" title="Minhas informações" color="white" mb={5} />
      </VStack>
    </VStack>
  );
}