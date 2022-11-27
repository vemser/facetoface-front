import { string, object } from "yup";

export const schemaCandidate = object({
  nome: string().required("Campo obrigatório!"),
  estado: string().required("Campo obrigatório!"),
  cidade: string().required("Campo obrigatório!"),
  genero: string().required("Campo obrigatório!"),
});