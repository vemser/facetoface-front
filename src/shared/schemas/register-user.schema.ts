import { string, object } from "yup";

export const schemaUser = object({
  nomeCompleto: string().required("Campo obrigatório!"),
  genero: string().required("Campo obrigatório!").nullable(),
  cidade: string().required("Campo obrigatório!"),
  estado: string().required("Campo obrigatório!"),
  perfis: string().required("Campo obrigatório!").nullable(),
  email: string().email("E-mail inválido!").required("Campo obrigatório!"),
  trilha: string().default("COLABORADOR")
});