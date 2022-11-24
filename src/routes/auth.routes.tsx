import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";


const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      
    </Navigator>
  );
}
