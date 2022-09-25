import { HStack, IconButton, useTheme, Heading, StyledProps } from 'native-base';
//import { useNavigation } from '@react-navigation/native';

import { CaretLeft } from 'phosphor-react-native';

type Props = StyledProps & {
  title: string;
  isBackScreen: boolean;
}

export function Header({ isBackScreen = true, title, ...rest }: Props) {
  //const navigation = useNavigation();
  const { colors } = useTheme();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.600"
      pb={6}
      pt={12}
      {...rest}
    >
      { isBackScreen && 
        <IconButton 
          icon={<CaretLeft color={colors.gray[200]} size={24} />}
        />
      }
      
      <Heading 
        color="white" 
        textAlign="center" 
        fontSize="xl"
        flex={1}
        ml={-6}
      >
        {title}
      </Heading>
    </HStack>
  );
}