import { string, object } from "yup";

export const schemaInterview = object({
  candidate: string().required("Campo obrigatório!").matches(/^([^0-9]*)$/, "Números não são permitidos!"),
  dateInterview: string().required("Campo obrigatório!"),
  city: string().required("Campo obrigatório!").matches(/^([^0-9]*)$/, "Números não são permitidos!"),
  email: string().email("E-mail inválido!").required("Campo obrigatório!"),
  scheduleInterview: string().required("Campo obrigatório!"),
  state: string().required("Campo obrigatório!").matches(/^([^0-9]*)$/, "Números não são permitidos!"),
  observation: string(),
});
