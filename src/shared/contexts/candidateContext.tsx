import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICandidate } from "../interfaces";
import { api } from "../api";
import alertError from "../alerts/error";
import alertSuccess from "../alerts/sucess";
import { useAuth } from "./authContext";

interface ICandidateContext {
  candidates: any;
  postCandidate: (data: ICandidate) => Promise<void>;
  putCandidate: (data: ICandidate) => void;
  deleteCandidate: (id: number) => void;
  getCandidates: (page?: number, size?: number) => Promise<void>;
}

interface IChildren {
  children: React.ReactNode;
}

const CandidateContext = createContext({} as ICandidateContext);

export const CandidateProvider: React.FC<IChildren> = ({ children }) => {
  const { token } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  // post one candidate
  const postCandidate = async (candidate: ICandidate) => {
    try {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      let genero = candidate.genero;
      let arr: any = candidate;
      delete arr.genero;
      await api.post(`candidato?genero=${genero}`, candidate);
      alertSuccess("Candidato cadastrado com sucesso!");
      navigate("/");
    } catch (err) {
      alertError("Ops! algo deu errado!");
    } finally {
      // adicionar loading
    }
  };

  // update one candidate
  const putCandidate = (data: ICandidate) => {
    try {
    } catch (err) {
      console.log(err);
    } finally {
      // adicionar loading
    }
  };

  // delete one candidate
  const deleteCandidate = (id: number) => {
    try {
      console.log(id);
    } catch (err) {
      console.log(err);
    } finally {
      // adicionar loading
    }
  };

  // get all candidates
  const getCandidates = async (page: number = 0, size: number = 10) => {
    try {
      const { data } = await api.get(
        `candidato?pagina=${page}&tamanho=${size}`
      );
      setCandidates(data);
    } catch (err) {
      alertError("Ops! algo deu na busca por candidatos!");
    } finally {
      // adicionar loading
    }
  };

  return (
    <CandidateContext.Provider
      value={{
        candidates,
        postCandidate,
        deleteCandidate,
        getCandidates,
        putCandidate,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidate = () => {
  return useContext(CandidateContext);
};
