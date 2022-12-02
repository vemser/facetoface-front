import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser, IUserComplete } from "../interfaces";
import { api } from "../api";
import { useAuth } from "./authContext";
import axios from "axios";
import alertSuccess from "../alerts/sucess";
import alertError from "../alerts/error";
import nProgress from "nprogress";

interface IUserContext {
  users: any;
  sizePage: number;
  attStateUser: boolean;
  postUser: (usuario: IUser, file?: File) => Promise<void>;
  putUser: (usuario: IUserComplete) => Promise<void>;
  deleteUser: (id: number) => void;
  getUsers: (page?: number, size?: number) => Promise<void>;
  getUserByName: (nome: string, page?: number, size?: number) => Promise<void>;
  getByName: (name: string, page?: number, size?: number) => Promise<void>;
  postImage: (file: any, email: string) => Promise<void>;
  getUserImage: (email: string) => Promise<any>;
}

interface IChildren {
  children: React.ReactNode;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider: React.FC<IChildren> = ({ children }) => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [sizePage, setSizePage] = useState<number>(0);
  const [attStateUser, setAttStateUser] = useState<boolean>(false);

  // get all users
  const getUsers = async (page: number = 0, size: number = 10) => {
    try {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      const { data } = await api.get(`usuario?pagina=${page}&tamanho=${size}`);
      setUsers(data);
      setSizePage(data.tamanho);
    } catch (err) {
      alertError("Ops! algo deu na busca por usuários!");
    } finally {
    }
  };

  // post one user
  const postUser = async (usuario: IUser) => {
    try {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      await api.post(`usuario?genero=${usuario.genero}`, usuario);
      alertSuccess("Usuário cadastrado com sucesso!");
      navigate("/");
    } catch (err) {
      alertError("Ops! algo deu errado no cadastro!");
    } finally {
      // adicionar loading
    }
  };

  // update one user
  const putUser = async (usuario: IUserComplete) => {
    try {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      await api.put(
        `usuario/${usuario.idUsuario}?genero=${usuario.genero}`,
        usuario
      );
      navigate("/");
      alertSuccess("Usuário editado com sucesso!");
    } catch (err) {
      alertError("Ops! algo deu errado na atualização!");
    } finally {
      // adicionar loading
    }
  };

  // delete one user
  const deleteUser = async (idUsuario: number) => {
    try {
      await axios
        .delete(`${api}/usuario/${idUsuario}`, {
          headers: {
            Authorization: token,
          },
        })
        .then(() => {
          navigate("/");
          setAttStateUser((state) => !state);
          alertSuccess("Usuário deletado com sucesso!");
        });
    } catch (err) {
      alertError("Ops! algo deu errado!");
    } finally {
      // adicionar loading
    }
  };

  const postImage = async (file: any, email: string) => {
    try {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      await api.put(`usuario/upload-foto?email=${email}`, file);
    } catch (err) {
      alertError("Ops, algo deu errado!");
    } finally {
    }
  };

  const getByName = async (
    name: string,
    page: number = 0,
    size: number = 10
  ) => {
    try {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      const { data } = await api.get(
        `usuario/findbynomecompleto?nomeCompleto=${name}&pagina=${page}&tamanho=${size}`
      );
      setUsers(data);
      navigate("/");
    } catch (err) {
      alertError("Ops! algo deu errado na busca!");
    } finally {
    }
  };

  const getUserByName = async (
    nome: string,
    page: number = 0,
    size: number = 10
  ) => {
    try {
      await axios
        .get(
          `${api}/usurario/findbynomecompleto??nomeCompleto=${nome}&pagina=${page}&tamanho=${size}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          setUsers(response.data);
          navigate("/");
        });
    } catch (err) {
      alertError("Ops! algo deu errado na busca!");
    } finally {
    }
  };

  const getUserImage = async (email: string) => {
    try {
      nProgress.start();
      const { data } = await api.get(`usuario/recuperar-imagem?email=${email}`);
      return data;
    } catch (err) {
      //alertError("Ops, algo deu errado!");
    } finally {
      nProgress.done();
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        sizePage,
        attStateUser,
        postUser,
        putUser,
        deleteUser,
        getUsers,
        getUserByName,
        getByName,
        postImage,
        getUserImage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
