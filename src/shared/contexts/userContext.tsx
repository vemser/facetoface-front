import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces";
import { api } from "../api";

interface IUserContext {
  users: any;
  postUser: (data: IUser) => void;
  putUser: (data: IUser) => void;
  deleteUser: (id: number) => void;
  getUsers: (page: number, size: number) => void;
}

interface IChildren {
  children: React.ReactNode;
}

const UserContext = createContext({} as IUserContext);

export const UserProvider: React.FC<IChildren> = ({ children }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // post one user
  const postUser = (data: IUser) => {
    try {
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  // update one user
  const putUser = (data: IUser) => {
    try {
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  // delete one user
  const deleteUser = (id: number) => {
    try {
      console.log(id);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  // get all user
  const getUsers = (page: number, size: number) => {
    try {
    } catch (err) {
      console.log(err);
    } finally {
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};