import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

interface IAuthContext {
  token: string | null;
  handleSignIn: () => Promise<void>;
  handleLogout: () => void;
}

interface IChildren {
  children: React.ReactNode;
}

const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: React.FC<IChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const login = {
      email: "julio.gabriel@dbccompany.com",
      senha: "123",
    };
    try {
      const { data } = await api.post("/auth/fazer-login", login);
      localStorage.setItem("token", data);
      setToken(data);
      navigate("/");
    } catch (err) {
      console.log();
    } finally {
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, handleSignIn, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
