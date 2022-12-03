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
import axios from "axios";

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
  getListarPorNomeOuTrilhaOuEdicao: ({
    trilha,
    nome,
    edicao,
  }: IGetTrilhaNomeEdicao) => Promise<void>;
}

interface IChildren {
  children: React.ReactNode;
}

interface IGetTrilhaNomeEdicao {
  nome?: string | null;
  trilha?: string | null;
  edicao?: string | null;
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
      let message = "Ops, algo deu errado!";
      if (axios.isAxiosError(err) && err?.response) {
        message = err.response.data.message;
      }
      alertError(message);
    } finally {
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

      alertSuccess("Candidato editado com sucesso!");
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

  // delete one candidate
  const deleteCandidate = async (id: number) => {
    try {
      nProgress.start();
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      await api.delete("candidato/" + id);
      await getCandidates();
      alertSuccess("Candidato deletado com sucesso!");
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

  // get all candidates
  const getCandidates = async (page: number = 0, size: number = 10) => {
    try {
      nProgress.start();
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      const { data } = await api.get(
        `candidato?pagina=${page}&tamanho=${size}`
      );
      let listaOrdenada = data.elementos.sort(
        (a: ICandidateComplete, b: ICandidateComplete) => {
          if (a.notaProva > b.notaProva) return -1;
          if (a.notaProva < b.notaProva) return 1;
          return 0;
        }
      );
      let resultado = data;
      resultado.elementos = listaOrdenada;
      setCandidates(resultado);
    } catch (err) {
      let message = "Ops, algo deu errado!";
      if (axios.isAxiosError(err) && err?.response) {
        message = err.response.data.message;
      }
      alertError(message);
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
      let message = "Ops, algo deu errado!";
      if (axios.isAxiosError(err) && err?.response) {
        message = err.response.data.message;
      }
      alertError(message);
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
      let message = "Ops, algo deu errado!";
      if (axios.isAxiosError(err) && err?.response) {
        message = err.response.data.message;
      }
      alertError(message);
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
      let message = "Ops, algo deu errado!";
      if (axios.isAxiosError(err) && err?.response) {
        message = err.response.data.message;
      }
      alertError(message);
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
      let message = "Ops, algo deu errado!";
      if (axios.isAxiosError(err) && err?.response) {
        message = err.response.data.message;
      }
      alertError(message);
    } finally {
      nProgress.done();
    }
  };

  const getListarPorNomeOuTrilhaOuEdicao = async ({
    trilha,
    nome,
    edicao,
  }: IGetTrilhaNomeEdicao) => {
    try {
      nProgress.start();
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      let string = `${nome != null ? `&nomeCompleto=${nome}` : ""}${
        trilha != null ? `&nomeTrilha=${trilha}` : ""
      }${edicao != null ? `&nomeEdicao=${edicao}` : ""}`;

      const { data } = await api.get(
        `candidato/listar-candidato-cadastro-por-nome-ou-por-trilha?pagina=0&tamanho=10${string}`
      );

      let listaOrdenada = data.elementos.sort(
        (a: ICandidateComplete, b: ICandidateComplete) => {
          if (a.notaProva > b.notaProva) return -1;
          if (a.notaProva < b.notaProva) return 1;
          return 0;
        }
      );
      let resultado = data;
      resultado.elementos = listaOrdenada;

      setCandidates(resultado);
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

  const getCandidateImage = async (email: string) => {
    try {
      nProgress.start();
      const { data } = await api.get(
        `candidato/recuperar-imagem?email=${email}`
      );
      return data;
    } catch (err) {
    } finally {
      nProgress.done();
    }
  };

  const getCurriculo = async (email: string) => {
    try {
      nProgress.start();
      const { data } = await api.get(
        `candidato/recuperar-curriculo?email=${email}`
      );
      return data;
    } catch (err) {
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
        getListarPorNomeOuTrilhaOuEdicao,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidate = () => {
  return useContext(CandidateContext);
};
