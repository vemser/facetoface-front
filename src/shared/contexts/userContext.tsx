import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser, IUserComplete } from "../interfaces";
import { api } from "../api";
import { useAuth } from "./authContext";
import alertSuccess from "../alerts/sucess";
import alertError from "../alerts/error";
import nProgress from "nprogress";
import axios from "axios";

interface IUserContext {
  users: any;
  postUser: (usuario: IUser, file?: File) => Promise<void>;
  putUser: (usuario: IUserComplete) => Promise<void>;
  deleteUser: (id: number) => void;
  getUsers: (page?: number, size?: number) => Promise<void>;
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

  // get all users
  const getUsers = async (page: number = 0, size: number = 10) => {
    try {
      nProgress.start();
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      const { data } = await api.get(`usuario?pagina=${page}&tamanho=${size}`);
      setUsers(data);
    } catch (err) {
      let message = "Ops, algo deu errado!";
      if (axios.isAxiosError(err) && err?.response) {
        message = err.response.data.message;
      }
      alertError(message);
    } finally {
      nProgress.done();
    }
  };

  // post one user
  const postUser = async (usuario: IUser) => {
    try {
      nProgress.start();
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      await api.post(`usuario?genero=${usuario.genero}`, usuario);
      alertSuccess("Usuário cadastrado com sucesso!");
      navigate("/");
    } catch (err) {
      let message = "Ops, algo deu errado!";
      if (axios.isAxiosError(err) && err?.response) {
        message = err.response.data.message;
      }
      alertError(message);
    } finally {
      nProgress.done();
    }
  };

  // update one user
  const putUser = async (usuario: IUserComplete) => {
    try {
      nProgress.start();
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      await api.put(
        `usuario/${usuario.idUsuario}?genero=${usuario.genero}`,
        usuario
      );
      navigate("/");
      alertSuccess("Usuário editado com sucesso!");
    } catch (err) {
      let message = "Ops, algo deu errado!";
      if (axios.isAxiosError(err) && err?.response) {
        message = err.response.data.message;
      }
      alertError(message);
    } finally {
      nProgress.done();
    }
  };

  // delete one user
  const deleteUser = async (idUsuario: number) => {
    try {
      nProgress.start();
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      await api.delete(`usuario/${idUsuario}`);
      alertSuccess("Usuário deletado com sucesso!");
      await getUsers();
    } catch (err) {
      let message = "Ops, algo deu errado!";
      if (axios.isAxiosError(err) && err?.response) {
        message = err.response.data.message;
      }
      alertError(message);
    } finally {
      nProgress.done();
    }
  };

  // post image
  const postImage = async (file: any, email: string) => {
    try {
      nProgress.start();
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      await api.put(`usuario/upload-foto?email=${email}`, file);
    } catch (err) {
      let message = "Ops, algo deu errado!";
      if (axios.isAxiosError(err) && err?.response) {
        message = err.response.data.message;
      }
      alertError(message);
    } finally {
      nProgress.done();
    }
  };

  // get by name
  const getByName = async (
    name: string,
    page: number = 0,
    size: number = 10
  ) => {
    try {
      nProgress.start();
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      const { data } = await api.get(
        `usuario/findbynomecompleto?nomeCompleto=${name}&pagina=${page}&tamanho=${size}`
      );
      setUsers(data);
      navigate("/");
    } catch (err) {
      let message = "Ops, algo deu errado!";
      if (axios.isAxiosError(err) && err?.response) {
        message = err.response.data.message;
      }
      alertError(message);
    } finally {
      nProgress.done();
    }
  };

  // get user image
  const getUserImage = async (email: string) => {
    try {
      nProgress.start();
      const { data } = await api.get(`usuario/recuperar-imagem?email=${email}`);
      return data;
    } catch (err) {
      console.log(err);
    } finally {
      nProgress.done();
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        postUser,
        putUser,
        deleteUser,
        getUsers,
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
