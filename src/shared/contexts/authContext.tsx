import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IAuthContext {
  signIn: boolean;
  handleSignIn: () => void;
}

interface IChildren {
  children: React.ReactNode;
}

const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: React.FC<IChildren> = ({ children }) => {
  const [signIn, setSignIn] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    setSignIn(!signIn);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ signIn, handleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
