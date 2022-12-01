import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import alertError from "../alerts/error";
import alertSuccess from "../alerts/sucess";
import { api } from "../api";
import { IInterview } from "../interfaces";
import { useAuth } from "./authContext";

interface IInterviewContext {
  lista: IInterview[];
  schedules: any;
  postInterview: (interview: any) => Promise<void>;
  getInterview: () => Promise<void>;
  getByMonthYear: (day: number, year: number) => Promise<void>;
}

interface IChildren {
  children: React.ReactNode;
}

const InterviewContext = createContext({} as IInterviewContext);

export const InterviewProvider: React.FC<IChildren> = ({ children }) => {
  const { token } = useAuth();
  const [lista, setLista] = useState<IInterview[]>([]);
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);

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
      const { data } = await api.get<IInterview[]>("entrevista");

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

  const getByMonthYear = async (day: number, year: number) => {
    try {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      const { data } = await api.get(
        `entrevista/listar-por-mes?pagina=0&tamanho=10&mes=${day}&ano=${year}`
      );
      setSchedules(data);
    } catch (err) {
      alertError("Ops! algo deu errado!");
    }
  };

  return (
    <InterviewContext.Provider
      value={{
        postInterview,
        getInterview,
        getByMonthYear,
        lista,
        schedules,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};
//   const postInterview = async (interview: any) => {
//     try {
//       api.defaults.headers["Authorization"] = `Bearer ${token}`;
//       await api.post("entrevista/marcar-entrevista", interview);
//       alertSuccess("Entrevista cadastrada com sucesso!");
//       navigate("/");
//     } catch (err) {
//       alertError("Ops, algo deu errado!");
//     } finally {
//     }
//   };

//   return (
//     <InterviewContext.Provider
//       value={{ postInterview, getByMonthYear, schedules }}
//     >
//       {children}
//     </InterviewContext.Provider>
//   );
// };

export const useInterview = () => {
  return useContext(InterviewContext);
};
