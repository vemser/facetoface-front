import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import alertError from "../alerts/error";
import { api } from "../api";

interface IAuthContext {
  token: string | null;
  user: any;
  handleSignIn: (login: { email: string; senha: string }) => Promise<void>;
  handleLogout: () => void;
  handleSignedUser: () => Promise<void>;
}

interface IChildren {
  children: React.ReactNode;
}

const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: React.FC<IChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      let storage = JSON.parse(user);
      setUser(storage);
    }
  }, []);

  const handleSignIn = async (login: { email: string; senha: string }) => {
    try {
      const { data } = await api.post("/auth/fazer-login", login);
      localStorage.setItem("token", data);
      setToken(data);
      await handleSignedUser(data);
      navigate("/");
    } catch (err) {
      alertError("Senha ou email incorretos!");
    } finally {
    }
  };

  const handleSignedUser = async (token?: string) => {
    try {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      const { data } = await api.get("usuario/logado");
      console.log(data);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      alertError("Ops, algo deu errado!");
    } finally {
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, handleSignIn, handleLogout, handleSignedUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
