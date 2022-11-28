import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces";
import { api } from "../api";
import { useAuth } from "./authContext";
import axios from "axios";
import alertSuccess from "../alerts/sucess";
import alertError from "../alerts/error";

interface IUserContext {
	users: any;
  sizePage: number;
  attStateUser: boolean;
	postUser: (data: IUser) => void;
	putUser: (idUsuario: number, usuario: IUser) => Promise<void>;
	deleteUser: (id: number) => void;
	getUsers: (page: number, size: number) => void;
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
	const getUsers = async (page: number, size: number) => {
		try {
			await axios
				.get(`${api}/usuario?${page}=0&tamanho=${size}`, {
					headers: {
						Authorization: token,
					},
				})
				.then((response) => {
					setUsers(response.data);
					setSizePage(response.data.tamanho);
				});
		} catch (err) {
			console.log(err);
		} finally {
		}
	};

	// post one user
	const postUser = async (usuario: IUser) => {
		try {
			await axios
				.post(`${api}/usuario`, usuario, {
					headers: {
						Authorization: token,
					},
				})
				.then(() => {
					navigate("/");
					alertSuccess("Usuário cadastrado com sucesso!");
					console.log(usuario);
				});
		} catch (err) {
			console.log(err);
			alertError("Ops! algo deu errado!");
		} finally {
			// adicionar loading
		}
	};

	// update one user
	const putUser = async (idUsuario: number, usuario: IUser) => {
		try {
      await axios
        .put(`${api}/usuario/${idUsuario}`, usuario, {
          headers: {
						Authorization: token,
					},
        })
        .then(() => {
          // navigate("/pagina de edit")
          setAttStateUser((state) => !state)
          alertSuccess("Usuário editado com sucesso!");
        });
		} catch (err) {
			console.log(err);
      alertError("Ops! algo deu errado!");
		} finally {
      // adicionar loading
		}
	};

	// delete one user
	const deleteUser = async (idUsuario: number, ) => {
		try {
      await axios
        .delete(`${api}/usuario/${idUsuario}`, {
          headers: {
						Authorization: token,
					},
        })
        .then(() => {
          navigate("/")
          setAttStateUser((state) => !state)
          alertSuccess("Usuário deletado com sucesso!");
        });
		} catch (err) {
			console.log(err);
      alertError("Ops! algo deu errado!");
		} finally {
      // adicionar loading
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
			}}
		>
			{children}
		</UserContext.Provider>
	);
};