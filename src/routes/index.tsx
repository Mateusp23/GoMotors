import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import React, { useCallback, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Loading } from "../components/Loading";
import { AppRoutes } from "./app.routes";

import { AuthRoutes } from "./auth.routes";

export function Routes() {
// const { userType } = useAuth();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((response) => {
      setUser(response);
      setLoading(false);
    });

    return subscriber;
  }, []);


  const getTypeUser = useCallback(async () => {
    const userTypeStorage = await AsyncStorage.getItem('key');
    setUserType(userTypeStorage);
  }, [userType]);

  useEffect(() => {
    getTypeUser();
    console.log("tipo user:", userType);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (user && userType !== "") {
    console.log("caiu")
    return <AppRoutes />;
  }

  return <AuthRoutes />;
}
