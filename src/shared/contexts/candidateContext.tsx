import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICandidate, ICandidateComplete } from "../interfaces";
import { api } from "../api";
import alertError from "../alerts/error";
import alertSuccess from "../alerts/sucess";
import { useAuth } from "./authContext";

interface ICandidateContext {
  candidates: any;
  postCandidate: (data: ICandidate) => Promise<void>;
  putCandidate: (candidato: ICandidateComplete) => Promise<void>;
  deleteCandidate: (id: number) => Promise<void>;
  getCandidates: (page?: number, size?: number) => Promise<void>;
  getByName: (name: string, page?: number, size?: number) => Promise<void>;
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
      alertError("Ops! algo deu errado no cadastro!");
    } finally {
      // adicionar loading
    }
  };

  // update one candidate
  const putCandidate = async (candidato: ICandidateComplete) => {
    try {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      await api.put(
        `candidato/${candidato.idCandidato}?genero=${candidato.genero}`,
        candidato
      );
      alertSuccess("Candidato cadastrado com sucesso!");
      navigate("/");
    } catch (err) {
      alertError("Ops! algo deu errado na atualização!");
    } finally {
      // adicionar loading
    }
  };

  // delete one candidate
  const deleteCandidate = async (id: number) => {
    try {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      await api.delete("candidato/" + id);
      await getCandidates();
      alertSuccess("Candidato deletado com sucesso!");
    } catch (err) {
      alertError("Ops! algo deu errado na exclusão!");
    } finally {
      // adicionar loading
    }
  };

  // get all candidates
  const getCandidates = async (page: number = 0, size: number = 10) => {
    try {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
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

  const getByName = async (
    name: string,
    page: number = 0,
    size: number = 10
  ) => {
    try {
      const { data } = await api.get(
        `findbynomecompleto?nomeCompleto=${name}&pagina=${page}&tamanho=${size}`
      );
      setCandidates(data);
      alertSuccess("Candidato cadastrado com sucesso!");
      navigate("/");
    } catch (err) {
      alertError("Ops! algo deu errado na busca!");
    } finally {
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
        getByName,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidate = () => {
  return useContext(CandidateContext);
};
