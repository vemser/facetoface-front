import { string, array, object } from "yup";

export const schemaCandidate = object({
  name: string().required("Campo obrigatório!"),
  genre: string().required("Campo obrigatório!"),
  city: string().required("Campo obrigatório!"),
  state: string().required("Campo obrigatório!"),
  class: string().required("Campo obrigatório!"),
  edition: string().required("Campo obrigatório!"),
  observation: string().required("Campo obrigatório!"),
  email: string().email("E-mail inválido!").required("Campo obrigatório!"),
});
