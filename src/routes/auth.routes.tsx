import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserInformation } from "../screens/UserInformation";
import { SignIn } from "../screens/SingIn";
import { Loading } from "../screens/Loading";
import { RegisterUser } from "../screens/RegisterUser";

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignIn} />
      <Screen name="userInformation" component={UserInformation} />
      <Screen name="registerUser" component={RegisterUser} />
    </Navigator>
  );
}
