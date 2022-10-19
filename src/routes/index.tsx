import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { SignIn } from "../screens/SingIn";
import { AppRoutes } from "./app.routes";
import { Loading } from "../components/Loading";
import { UserInformation } from "../screens/UserInformation";
import { Loading as LoadingScreen } from "../screens/Loading";

export function Routes() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((response) => {
      setUser(response);
      setLoading(false);
    });

    return subscriber;
  }, []);

  function verifyUseTypeAndCity() {}

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
      {/* {user ? <LoadingScreen /> : <SignIn />} */}
    </NavigationContainer>
  );
}
