import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useCallback, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/auth";
import { EditMotoboy } from "../screens/EditMotoboy";
import { EditRestaurant } from "../screens/EditRestaurant";
import { HomeMotoboy } from "../screens/HomeMotoboy";
import { HomeRestaurant } from "../screens/HomeRestaurant";
import { Loading } from "../screens/Loading";
import { MotoboyDetails } from "../screens/MotoboyDetails";

const { KEY_STORAGE_TYPE_USER } = process.env;
const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  const { userType, setUserType } = useAuth();

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
