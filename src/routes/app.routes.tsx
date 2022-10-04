
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserInformation } from '../screens/UserInformation';
import { HomeMotoboy } from '../screens/HomeMotoboy';
import { SignIn } from '../screens/SingIn';
import { HomeRestaurant } from '../screens/HomeRestaurant';
import { EditMotoboy } from '../screens/EditMotoboy';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignIn} />
      <Screen name="userInformation" component={UserInformation} />
      <Screen name="homeMotoboy" component={HomeMotoboy} />
      <Screen name="homeRestaurant" component={HomeRestaurant} />
      <Screen name="editMotoboy" component={EditMotoboy} />
    </Navigator>
  );
}