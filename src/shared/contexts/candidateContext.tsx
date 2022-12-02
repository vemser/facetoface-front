import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ICandidate,
  ICandidateComplete,
  IObjectCandidate,
} from "../interfaces";
import { api } from "../api";
import alertError from "../alerts/error";
import alertSuccess from "../alerts/sucess";
import { useAuth } from "./authContext";
import nProgress from "nprogress";

interface ICandidateContext {
  candidates: any;
  candidateByEmail: any;
  postCandidate: (data: ICandidate) => Promise<void>;
  putCandidate: (candidato: ICandidateComplete) => Promise<void>;
  deleteCandidate: (id: number) => Promise<void>;
  getCandidates: (page?: number, size?: number) => Promise<void>;
  getByEmail: (email: string) => Promise<void>;
  getByEmailInterview: (email: string) => Promise<any>;
  getCandidateImage: (email: string) => Promise<any>;
  postImage: (file: any, email: string) => Promise<void>;
  postCurriculo: (file: any, email: string) => Promise<void>;
  getCurriculo: (email: string) => Promise<any>;
  getListarPorNomeOuTrilha: (trilha: string) => Promise<void>;
}

interface IChildren {
  children: React.ReactNode;
}

interface IGetTrilhaNome {
  nome?: string;
  trilha?: string;
}

const CandidateContext = createContext({} as ICandidateContext);

export const CandidateProvider: React.FC<IChildren> = ({ children }) => {
  const { token } = useAuth();
  const [candidates, setCandidates] = useState<IObjectCandidate | []>([]);
  const [candidateByEmail, setCandidateByEmail] = useState([]);
  const navigate = useNavigate();

  // post one candidate
  const postCandidate = async (candidate: ICandidate) => {
    try {
      nProgress.start();
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
      nProgress.done();
    }
  };

  // update one candidate
  const putCandidate = async (candidato: ICandidateComplete) => {
    try {
      nProgress.start();
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
      nProgress.done();
    }
  };

  // delete one candidate
  const deleteCandidate = async (id: number) => {
    try {
      nProgress.start();
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      await api.delete("candidato/" + id);
      await getCandidates();
      alertSuccess("Candidato deletado com sucesso!");
    } catch (err) {
      alertError("Ops! algo deu errado na exclusão!");
    } finally {
      // adicionar loading
      nProgress.done();
    }
  };

  // get all candidates
  const getCandidates = async (page: number = 0, size: number = 10) => {
    try {
      nProgress.start();
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      const { data } = await api.get(
        `candidato?pagina=${page}&tamanho=${size}`
      );
      setCandidates(data);
    } catch (err) {
      alertError("Ops! algo deu na busca por candidatos!");
    } finally {
      // adicionar loading
      nProgress.done();
    }
  };

  // pegar por email
  const getByEmail = async (email: string) => {
    try {
      nProgress.start();
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      const { data } = await api.get(`candidato/findbyemails/${email}`);
      setCandidates({
        totalElementos: 1,
        quantidadePaginas: 1,
        pagina: 0,
        tamanho: 10,
        elementos: [data],
      });
      alertSuccess("Candidato encontrado!");
      navigate("/");
    } catch (err) {
      alertError("Ops! algo deu errado na busca!");
    } finally {
      nProgress.done();
    }
  };

  // pegar por email
  const getByEmailInterview = async (email: string) => {
    try {
      nProgress.start();
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      const { data } = await api.get(`candidato/findbyemails/${email}`);
      setCandidateByEmail(data);
    } catch (err) {
      alertError("Ops! algo deu errado na busca!");
    } finally {
      nProgress.done();
    }
  };

  const postImage = async (file: any, email: string) => {
    try {
      nProgress.start();
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      await api.put(`candidato/upload-foto?email=${email}`, file);
    } catch (err) {
      alertError("Ops, algo deu errado no upload de imagem!");
    } finally {
      nProgress.done();
    }
  };

  const postCurriculo = async (file: any, email: string) => {
    try {
      nProgress.start();
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      await api.put(`candidato/upload-curriculo?email=${email}`, file);
    } catch (err) {
      alertError("Ops, algo deu errado no upload do curriculo!");
    } finally {
      nProgress.done();
    }
  };

  const getListarPorNomeOuTrilha = async (trilha: string) => {
    try {
      nProgress.start();
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      const { data } = await api.get(
        `candidato/listar-candidato-cadastro-por-nome-ou-por-trilha?pagina=0&tamanho=10&nomeTrilha=${trilha}`
      );
      setCandidates(data);
      //}
    } catch (err) {
    } finally {
      nProgress.done();
    }
  };

  const getCandidateImage = async (email: string) => {
    try {
      nProgress.start();
      console.log(email);
      const { data } = await api.get(
        `candidato/recuperar-imagem?email=${email}`
      );
      return data;
    } catch (err) {
      console.log(err);
    } finally {
      nProgress.done();
    }
  };

  const getCurriculo = async (email: string) => {
    try {
      nProgress.start();
      console.log(email);
      const { data } = await api.get(
        `candidato/recuperar-curriculo?email=${email}`
      );
      return data;
    } catch (err) {
      console.log(err);
    } finally {
      nProgress.done();
    }
  };

  return (
    <CandidateContext.Provider
      value={{
        candidateByEmail,
        candidates,
        postCandidate,
        deleteCandidate,
        getCandidates,
        putCandidate,
        getByEmail,
        getByEmailInterview,
        getCandidateImage,
        postImage,
        postCurriculo,
        getCurriculo,
        getListarPorNomeOuTrilha,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidate = () => {
  return useContext(CandidateContext);
};
