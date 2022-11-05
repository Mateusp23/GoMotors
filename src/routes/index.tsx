import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import React, { useEffect, useState } from "react";

import { Loading } from "../components/Loading";
import { AppRoutes } from "./app.routes";

import { useAuth } from "../context/auth";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { userType } = useAuth();
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

  if (user && userType !== "") {
    return <AppRoutes />;
  }

  return <AuthRoutes />;
}
