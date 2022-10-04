import React, { useState, useEffect } from 'react';
import { VStack, HStack, Box, IconButton, Heading, useTheme, Text, FlatList, Center, Icon } from 'native-base';
import { Header } from '../components/Header';
import { Filter } from '../components/Filter';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../context/auth';

import IconMoto from '../assets/icon-moto.svg';

import { SignOut } from 'phosphor-react-native';
import { Button } from '../components/Button';
import { HeaderProfile } from '../components/HeaderProfile';
import { Params, Profile } from '../components/ButtonInformation';

export function HomeMotoboy() {
  const [profile, setProfile] = useState({} as Profile);
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState([])
  const { colors } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { signIn, user } = useAuth();
  const { token } = route.params as Params;

  async function loadProfile() {
    const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${token}`);
    const userInfo = await response.json();

    setProfile(userInfo);
    //console.log("token", userInfo);
    signIn(userInfo);
  }
  console.log("**", user);

  useEffect(() => {
    loadProfile();
  }, []);

  const handleNewScreen = () => {
    navigation.navigate('homeRestaurant');
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HeaderProfile url={user.picture} title={user.given_name} />

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

        <Button bgColor="primary.700" title="Minhas informações" color="white" mb={5} onPress={handleNewScreen}/>
      </VStack>
    </VStack>
  );
}