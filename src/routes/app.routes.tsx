import React, { useState, useEffect, useCallback } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserInformation } from "../screens/UserInformation";
import { HomeMotoboy } from "../screens/HomeMotoboy";
import { SignIn } from "../screens/SingIn";
import { HomeRestaurant } from "../screens/HomeRestaurant";
import { EditMotoboy } from "../screens/EditMotoboy";
import { EditRestaurant } from "../screens/EditRestaurant";
import { MotoboyDetails } from "../screens/MotoboyDetails";
import { Loading } from "../screens/Loading";
import { RegisterUser } from "../screens/RegisterUser";
import { useAuth } from "../context/auth";

const { KEY_STORAGE_TYPE_USER } = process.env;
import AsyncStorage from "@react-native-async-storage/async-storage";
const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  const { userType, setUserType } = useAuth();
  const [cities, setCities] = useState("");

  const getTypeUser = useCallback(async () => {
    const userTypeStorage = await AsyncStorage.getItem(KEY_STORAGE_TYPE_USER);
    setUserType(userTypeStorage);
  }, []);

  useEffect(() => {
    getTypeUser();
  }, []);

  return (
    <>
      {userType === "motoboy" ? (
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen name="homeMotoboy" component={HomeMotoboy} />
          <Screen name="editMotoboy" component={EditMotoboy} />
        </Navigator>
      ) : (
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen name="homeRestaurant" component={HomeRestaurant} />
          <Screen name="editRestaurant" component={EditRestaurant} />
          <Screen name="motoboyDetails" component={MotoboyDetails} />
          <Screen name="loading" component={Loading} />
        </Navigator>
      )}
    </>
  );
}
