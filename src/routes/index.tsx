import React, { useState, useEffect, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { SignIn } from "../screens/SingIn";
import { AppRoutes } from "./app.routes";
import { Loading } from "../components/Loading";
import { UserInformation } from "../screens/UserInformation";
import { Loading as LoadingScreen } from "../screens/Loading";
import { RegisterUser } from "../screens/RegisterUser";
import { HomeMotoboy } from "../screens/HomeMotoboy";
import { HomeRestaurant } from "../screens/HomeRestaurant";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "../context/auth";

export function Routes() {
  const { userType } = useAuth();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  const [cities, setCities] = useState("");

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

  if (user && userType !== "") {
    return <AppRoutes />;
  }

  return <AuthRoutes />;
}
