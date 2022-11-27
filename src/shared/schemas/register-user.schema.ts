import { string, object } from "yup";

export const schemaUser = object({
  name: string().required("Campo obrigatório!"),
  genre: string().required("Campo obrigatório!").nullable(),
  city: string().required("Campo obrigatório!"),
  state: string().required("Campo obrigatório!"),
  type: string().required("Campo obrigatório!").nullable(),
  email: string().email("E-mail inválido!").required("Campo obrigatório!"),
});