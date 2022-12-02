import axios from "axios";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import alertError from "../alerts/error";
import alertSuccess from "../alerts/sucess";
import { api } from "../api";

interface IPasswordContext {
  postRecoverPassword: (email: string) => Promise<void>;
  postToken: (token: string) => Promise<void>;
  changePassword: ({
    oldPassword,
    newPassword,
  }: IChangePassword) => Promise<void>;
}

interface IChildren {
  children: React.ReactNode;
}

interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

const PasswordContext = createContext({} as IPasswordContext);

export const PasswordProvider: React.FC<IChildren> = ({ children }) => {
  const navigate = useNavigate();
  // post socicitar token
  const postRecoverPassword = async (email: string) => {
    try {
      const { data } = await api.post(
        `auth/solicitar-troca-senha?email=${email}`,
        email
      );
      navigate("/");
      alertSuccess("Solicitação enviada para seu E-mail!");
    } catch (err) {
      let message = "Ops, algo deu errado!";
      if (axios.isAxiosError(err) && err?.response) {
        message = err.response.data.message;
      }
      alertError(message);
    } finally {
      // adicionar loading
    }
  };

  const postToken = async (token: string) => {
    try {
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
      // adicionar loading
    }
  };

  const changePassword = async ({
    oldPassword,
    newPassword,
  }: IChangePassword) => {
    try {
      await api.put(
        `usuario/trocar-senha-usuario-logado?senhaAtual=${oldPassword}&senhaNova=${newPassword}`
      );
      alertSuccess("Senha alterada!");
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
