import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import alertError from "../alerts/error";
import alertSuccess from "../alerts/sucess";
import { api } from "../api";
import { useAuth } from "./authContext";

interface IInterviewContext {
  //isOpen: boolean;
  postInterview: (interview: any) => Promise<void>;
}

interface IChildren {
  children: React.ReactNode;
}

const InterviewContext = createContext({} as IInterviewContext);

export const InterviewProvider: React.FC<IChildren> = ({ children }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const postInterview = async (interview: any) => {
    try {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      await api.post("entrevista/marcar-entrevista", interview);
      alertSuccess("Entrevista cadastrada com sucesso!");
      navigate("/");
    } catch (err) {
      alertError("Ops, algo deu errado!");
    } finally {
    }
  };

  return (
    <InterviewContext.Provider value={{ postInterview }}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  return useContext(InterviewContext);
};
