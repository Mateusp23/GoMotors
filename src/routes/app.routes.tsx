
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserInformation } from '../screens/UserInformation';
import { HomeMotoboy } from '../screens/HomeMotoboy';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="userInformation" component={UserInformation} />
      <Screen name="homeMotoboy" component={HomeMotoboy} />
    </Navigator>
  );
}