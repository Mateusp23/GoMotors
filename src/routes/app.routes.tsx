import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";

import { EditMotoboy } from "../screens/EditMotoboy";
import { EditRestaurant } from "../screens/EditRestaurant";
import { HomeMotoboy } from "../screens/HomeMotoboy";
import { HomeRestaurant } from "../screens/HomeRestaurant";
import { Loading } from "../screens/Loading";
import { MotoboyDetails } from "../screens/MotoboyDetails";
import { SignIn } from "../screens/SingIn";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((response) => {
      setUser(response);
      setLoading(false);
    });

    return subscriber;
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="signIn" component={SignIn} />
        <Screen name="homeMotoboy" component={HomeMotoboy} />
        <Screen name="editMotoboy" component={EditMotoboy} />
        <Screen name="homeRestaurant" component={HomeRestaurant} />
        <Screen name="editRestaurant" component={EditRestaurant} />
        <Screen name="motoboyDetails" component={MotoboyDetails} />
        <Screen name="loading" component={Loading} />
      </Navigator>
    </>
  );
}
