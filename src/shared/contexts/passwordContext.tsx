import axios from "axios";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import alertError from "../alerts/error";
import alertSuccess from "../alerts/sucess";
import { api } from "../api";
import { useAuth } from "./authContext";
import nProgress from "nprogress";

interface IPasswordContext {
  postRecoverPassword: (email: string) => Promise<void>;
  postToken: (token: string) => Promise<void>;
  changePassword: ({ senhaAtual, senhaNova }: IChangePassword) => Promise<void>;
}

interface IChildren {
  children: React.ReactNode;
}

interface IChangePassword {
  senhaAtual: string;
  senhaNova: string;
}

const PasswordContext = createContext({} as IPasswordContext);

export const PasswordProvider: React.FC<IChildren> = ({ children }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  // envia o pedido de recuperação de senha
  const postRecoverPassword = async (email: string) => {
    try {
      nProgress.start();
      await api.post(`auth/solicitar-troca-senha?email=${email}`, email);
      navigate("/");
      alertSuccess("Solicitação enviada para seu E-mail!");
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

  // envia o token de validação de e-mail
  const postToken = async (token: string) => {
    try {
      nProgress.start();
      await api.post(
        `http://vemser-dbc.dbccompany.com.br:39000/vemser/facetoface-back/auth/trocar-senha?token=${token}`,
        token
      );
      alertSuccess("Senha enviada para seu E-mail!");
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

  // troca a senha antiga pela nova
  const changePassword = async (data: IChangePassword) => {
    try {
      nProgress.start();
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      await api.put(`usuario/trocar-senha-usuario-logado`, data);
      alertSuccess("Senha alterada!");
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
    <PasswordContext.Provider
      value={{
        postRecoverPassword,
        postToken,
        changePassword,
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
};

export const useChangePassword = () => {
  return useContext(PasswordContext);
};
