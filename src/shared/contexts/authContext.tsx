import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import alertError from "../alerts/error";
import { api } from "../api";

interface IAuthContext {
  token: string | null;
  user: any;
  isAdmin: boolean;
  isGestor: boolean;
  isInstructor: boolean;
  handleSignIn: (login: { email: string; senha: string }) => Promise<void>;
  handleLogout: () => void;
}

interface IChildren {
  children: React.ReactNode;
}

const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: React.FC<IChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isGestor, setIsGestor] = useState<boolean>(false);
  const [isInstructor, setIsInstructor] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    let storageToken = localStorage.getItem("token");
    let storageUser = localStorage.getItem("user");
    if (storageToken && storageUser) {
      storageUser = JSON.parse(storageUser);
      handleGetRoles(storageUser);
      setToken(storageToken);
      setUser(storageUser);
    }
  }, []);

  const handleSignIn = async (login: { email: string; senha: string }) => {
    try {
      const responseToken = await api.post("/auth/fazer-login", login);
      api.defaults.headers["Authorization"] = `Bearer ${responseToken.data}`;
      const responseUser = await api.get("usuario/logado");
      localStorage.setItem("token", responseToken.data);
      localStorage.setItem("user", JSON.stringify(responseUser.data));
      handleGetRoles(responseUser.data);
      setUser(responseUser.data);
      setToken(responseToken.data);
      navigate("/");
    } catch (err) {
      alertError("Senha ou email incorretos!");
    } finally {
    }
  };

  const handleGetRoles = (user: any) => {
    let admin = user.perfis.find((item: any) => item.nome === "ROLE_ADMIN");
    if (admin) setIsAdmin(true);
    let gestao = user.perfis.find((item: any) => item.nome === "ROLE_GESTAO");
    if (gestao) setIsGestor(true);
    let instrutor = user.perfis.find(
      (item: any) => item.nome === "ROLE_INSTRUTOR"
    );
    if (instrutor) setIsInstructor(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsAdmin(false);
    setIsGestor(false);
    setIsInstructor(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAdmin,
        isGestor,
        isInstructor,
        handleSignIn,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
