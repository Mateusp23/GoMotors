import React from "react";
import { Button as ButtonInfo, Heading, Icon, useTheme, HStack, Box } from 'native-base';
import { ForkKnife } from 'phosphor-react-native';
import IconMoto from '../assets/icon-moto.svg';

export function ButtonInformation() {
  const { colors } = useTheme();
  return (
    <>
      <ButtonInfo 
        bg="primary.700"
        h={14}
        fontSize="sm"
        rounded="sm"
        _pressed={{ bg: "primary.400" }}
        justifyContent="space-between"
        mb={4}
      >
        <HStack width="full" space={48} alignItems="center" >
          <Heading fontSize="lg" color={colors.white}>
            Entregador
          </Heading>
          <Icon as={<IconMoto color={colors.white} size={32} />} />
        </HStack>
      </ButtonInfo>
      
      <ButtonInfo 
        bg="primary.700"
        h={14}
        fontSize="sm"
        rounded="sm"
        _pressed={{ bg: "primary.400" }}
        justifyContent="space-between"
        mb={4}
        endIcon={<Icon as={<ForkKnife color={colors.white} size={32} />} ml={32}/>}
      >
        <Heading fontSize="lg" color={colors.white}>
          Estabelecimento
        </Heading>
      </ButtonInfo>
    </>
  );
}