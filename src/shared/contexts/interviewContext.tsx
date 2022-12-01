import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import alertError from "../alerts/error";
import alertSuccess from "../alerts/sucess";
import { api } from "../api";
import { IInterview } from "../interfaces";
import { useAuth } from "./authContext";

interface IInterviewContext {
	//isOpen: boolean;
	postInterview: (interview: any) => Promise<void>;
	getInterview: () => Promise<void>,
  lista: IInterview[]
}

interface IChildren {
	children: React.ReactNode;
}

const InterviewContext = createContext({} as IInterviewContext);

export const InterviewProvider: React.FC<IChildren> = ({ children }) => {
	const { token } = useAuth();
	const [lista, setLista] = useState<IInterview[]>([]);
	const navigate = useNavigate();

	const postInterview = async (interview: any) => {
		try {
			api.defaults.headers["Authorization"] = `Bearer ${token}`;
			await api.post("entrevista/marcar-entrevista", interview);
			alertSuccess("Entrevista cadastrada com sucesso!");
			navigate("/");
		} catch (err) {
			let message = "Ops, algo deu errado!";
			if (axios.isAxiosError(err) && err?.response) {
				message = err.response.data.message;
			}
			alertError(message);
		} finally {
		}
	};

	const getInterview = async () => {
		try {
			api.defaults.headers["Authorization"] = `Bearer ${token}`;
			const {data} = await api.get<IInterview[]>("entrevista");
			
     setLista(data);
		} catch (err) {
			let message = "Ops, algo deu errado!";
			if (axios.isAxiosError(err) && err?.response) {
				message = err.response.data.message;
			}
			alertError(message);
		} finally {
		}
	};

	return (
		<InterviewContext.Provider
			value={{
				postInterview,
				getInterview,
        lista,
			}}
		>
			{children}
		</InterviewContext.Provider>
	);
};

export const useInterview = () => {
	return useContext(InterviewContext);
};
