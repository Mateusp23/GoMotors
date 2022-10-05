import { createContext, useContext, useState } from "react";

export interface AuthProps {
  name: string;
  email: string;
  id: string;
  given_name: string;
  picture: string;
  signIn: (email, name, id, given_name, picture) => void;
}

export const AuthContext = createContext({} as AuthProps);

function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  const signIn = ({ name, email, id, given_name, picture }: AuthProps) => {
    setUser({
      email: email,
      name: name,
      id: id,
      given_name: given_name,
      picture: picture,
    });
  };

  return (
    <AuthContext.Provider value={{ signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
