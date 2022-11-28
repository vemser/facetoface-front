import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import alertError from "../alerts/error";
import { api } from "../api";

interface IAuthContext {
  token: string | null;
  handleSignIn: (login: { email: string; senha: string }) => Promise<void>;
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

  const handleSignIn = async (login: { email: string; senha: string }) => {
    try {
      const { data } = await api.post("/auth/fazer-login", login);
      localStorage.setItem("token", data);
      setToken(data);
      navigate("/");
    } catch (err) {
      alertError("Senha ou email incorretos!");
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
