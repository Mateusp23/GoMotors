import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext, useCallback, useContext, useEffect, useState
} from "react";

export interface AuthProps {
  name: string;
  email: string;
  id: string;
  given_name: string;
  picture: string;
  userType: string;
  setUserType: React.Dispatch<React.SetStateAction<string>>;
  signIn: (email, name, id, given_name, picture) => void;
}

export const AuthContext = createContext({} as AuthProps);

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [userType, setUserType] = useState("");

  const getTypeUser = useCallback(async () => {
    const userTypeStorage = await AsyncStorage.getItem('key');
    setUserType(userTypeStorage);
  }, [userType]);

  const signIn = ({ name, email, id, given_name, picture }: AuthProps) => {
    setUser({
      email: email,
      name: name,
      id: id,
      given_name: given_name,
      picture: picture,
    });
  };

  useEffect(() => {
    getTypeUser();
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, user, userType, setUserType }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
