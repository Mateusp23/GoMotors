import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RegisterUser } from "../screens/RegisterUser";
import { SignIn } from "../screens/SingIn";
import { Splash } from "../screens/Splash";

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="splash" component={Splash} />
      <Screen name="signIn" component={SignIn} />
      <Screen name="registerUser" component={RegisterUser} />
    </Navigator>
  );
}
