import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserInformation } from "../screens/UserInformation";
import { HomeMotoboy } from "../screens/HomeMotoboy";
import { SignIn } from "../screens/SingIn";
import { HomeRestaurant } from "../screens/HomeRestaurant";
import { EditMotoboy } from "../screens/EditMotoboy";
import { EditRestaurant } from "../screens/EditRestaurant";
import { MotoboyDetails } from "../screens/MotoboyDetails";
import { Loading } from "../screens/Loading";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="userInformation" component={UserInformation} />
      <Screen name="loading" component={Loading} />
      <Screen name="homeMotoboy" component={HomeMotoboy} />
      <Screen name="homeRestaurant" component={HomeRestaurant} />
      <Screen name="editMotoboy" component={EditMotoboy} />
      <Screen name="editRestaurant" component={EditRestaurant} />
      <Screen name="motoboyDetails" component={MotoboyDetails} />
    </Navigator>
  );
}
