import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { RegisterUser } from "../screens/RegisterUser";
import { SignIn } from "../screens/SingIn";
import { UserInformation } from "../screens/UserInformation";

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignIn} />
      <Screen name="registerUser" component={RegisterUser} />
      <Screen name="userInformation" component={UserInformation} />
    </Navigator>
  );
}