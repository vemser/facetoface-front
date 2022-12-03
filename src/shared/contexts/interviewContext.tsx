import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import alertError from "../alerts/error";
import alertSuccess from "../alerts/sucess";
import { api } from "../api";
import { IInterview } from "../interfaces";
import { useAuth } from "./authContext";
import nProgress from "nprogress";
interface IInterviewContext {
  lista: IInterview[];
  schedules: any;
  schedulesFormated: any;
  postInterview: (interview: any) => Promise<void>;
  getInterview: () => Promise<void>;
  getByMonthYear: (month: number, year: number) => Promise<void>;
  updateInterview: (interview: any, id: number) => Promise<void>;
  confirmInterview: (token: string) => Promise<void>;
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
  const [schedulesFormated, setSchedulesFormated] = useState([]);

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
      nProgress.start();
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
      nProgress.done();
    }
  };

  const getByMonthYear = async (month: number, year: number) => {
    try {
      nProgress.start();
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      const { data } = await api.get(
        `entrevista/listar-por-mes?pagina=0&tamanho=10&mes=${month}&ano=${year}`
      );
      console.log(data);
      let result = data.elementos.map((item: any) => {
        let cor =
          item.legenda === "PENDENTE"
            ? "#ffeb3b"
            : item.legenda === "CONFIRMADA"
            ? "#4caf50"
            : item.legenda === "CANCELADA"
            ? "#f6685e"
            : "#999";
        return {
          date: item.dataEntrevista,
          title: item.candidatoDTO.nomeCompleto,
          color: cor,
          state: item,
        };
      });

      setSchedulesFormated(result);
      setSchedules(data);
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

  const updateInterview = async (interview: any, id: number) => {
    try {
      nProgress.start();
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      await api.put(
        `entrevista/atualizar-entrevista/${id}?legenda=PENDENTE`,
        interview
      );
      alertSuccess("Update feito com sucesso!");
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

  // envia o token para confirmar
  const confirmInterview = async (token: string) => {
    try {
      nProgress.start();
      await api.put(
        `auth/confirmar-entrevista?tokenEntrevista=${token}`,
        token
      );
      navigate("/");
      alertSuccess("Entrevista confirmada!");
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

  return (
    <InterviewContext.Provider
      value={{
        postInterview,
        getInterview,
        getByMonthYear,
        lista,
        schedules,
        schedulesFormated,
        updateInterview,
        confirmInterview,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  return useContext(InterviewContext);
};
