import React, { useState } from "react";
import { Button as ButtonInfo, Heading, Icon, useTheme, HStack, Box, VStack, Text, Checkbox } from 'native-base';
import { ForkKnife } from 'phosphor-react-native';
import IconMoto from '../assets/icon-moto.svg';

export function ButtonInformation() {
  const [isButtonSelected, setIsButtonSelected ] = useState(false);
  const [groupValue, setGroupValue] = React.useState(["torres"]);
  const { colors } = useTheme();

  const handleShowInfos = () => {
    setIsButtonSelected(true);
  }

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
        onPress={handleShowInfos}
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
        mb={6}
        endIcon={<Icon as={<ForkKnife color={colors.white} size={32} />} ml={32}/>}
        onPress={handleShowInfos}
      >
        <Heading fontSize="lg" color={colors.white}>
          Estabelecimento
        </Heading>
      </ButtonInfo>
    
      {
        isButtonSelected && (
          <VStack width="full">
            <Heading 
              color="white" 
              textAlign="center" 
              fontSize="xl"
            >
              Informe sua cidade de atuação
            </Heading>
            <HStack mt={6}>
              <Checkbox.Group colorScheme="orange" defaultValue={groupValue} accessibilityLabel="city" 
                onChange={() => {}}
              >
                <Checkbox value="torres" my="2">
                  <Text fontSize="md" color="white">
                    Torres - RS
                  </Text>
                </Checkbox>
                <Checkbox value="tc" my="2">
                  <Text fontSize="md" color="white">
                    Três Cachoeiras - RS
                  </Text>
                </Checkbox>
                <Checkbox value="arroio" my="2">
                  <Text fontSize="md" color="white">
                    Arroio do Sal - RS
                  </Text>
                </Checkbox>               
              </Checkbox.Group>
            </HStack>
          </VStack>
        )
      }
    </>
  );
}



