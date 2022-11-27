import { string, object } from "yup";

export const schemaCandidate = object({
  name: string().required("Campo obrigatório!"),
  genre: string().required("Campo obrigatório!").nullable(),
  city: string().required("Campo obrigatório!"),
  state: string().required("Campo obrigatório!"),
  class: string().required("Campo obrigatório!").nullable(),
  edition: string().required("Campo obrigatório!"),
  observation: string(),
  email: string().email("E-mail inválido!").required("Campo obrigatório!"),
});
