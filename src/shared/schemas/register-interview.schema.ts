import { string, object } from "yup";

export const schemaInterview = object({
  nomeCompleto: string()
    .required("Campo obrigatório!")
    .matches(/^([^0-9]*)$/, "Números não são permitidos!"),
  dateInterview: string().required("Campo obrigatório!"),
  cidade: string()
    .required("Campo obrigatório!")
    .matches(/^([^0-9]*)$/, "Números não são permitidos!"),
  email: string().email("E-mail inválido!").required("Campo obrigatório!"),
  scheduleInterview: string().required("Campo obrigatório!"),
  estado: string()
    .required("Campo obrigatório!")
    .matches(/^([^0-9]*)$/, "Números não são permitidos!"),
  observacoes: string().default("Sem observações"),
});
