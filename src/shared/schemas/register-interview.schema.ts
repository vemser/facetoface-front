import { string, object } from "yup";

export const schemaInterview = object({
  candidate: string().required("Campo obrigatório!"),
  dateInterview: string().required("Campo obrigatório!"),
  city: string().required("Campo obrigatório!"),
  email: string().email("E-mail inválido!").required("Campo obrigatório!"),
  scheduleInterview: string().required("Campo obrigatório!"),
  state: string().required("Campo obrigatório!"),
  observation: string().required("Campo obrigatório!"),
});
