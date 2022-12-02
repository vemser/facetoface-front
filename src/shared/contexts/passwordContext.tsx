import axios from "axios";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import alertError from "../alerts/error";
import alertSuccess from "../alerts/sucess";
import { api } from "../api";


interface IPasswordContext {
  postRecoverPassword: (email: string) => Promise<void>
}

interface IChildren {
  children: React.ReactNode;
}

const PasswordContext = createContext({} as IPasswordContext);

export const PasswordProvider: React.FC<IChildren> = ({ children }) => {
  const navigate = useNavigate();
  // post socicitar token
  const postRecoverPassword = async (email: string) => {
    try {
     const resposta = await api.post(`auth/solicitar-troca-senha?email=${email}`, email);
     navigate("/SignIn");
     console.log(resposta);
      alertSuccess("Senha enviada com sucesso!");
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

  return (
    <PasswordContext.Provider
    value={{
      postRecoverPassword,
    }}
  >
    {children}
  </PasswordContext.Provider>
);
}

export const useChangePassword = () => {
    return useContext(PasswordContext);
  };