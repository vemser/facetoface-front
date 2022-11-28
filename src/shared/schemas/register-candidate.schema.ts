import { string, object } from "yup";

export const schemaCandidate = object({
  nomeCompleto: string().required("Campo obrigatório!"),
  genero: string().required("Campo obrigatório!").nullable(),
  cidade: string().required("Campo obrigatório!"),
  estado: string().required("Campo obrigatório!"),
  trilha: object({ nome: string().required("Campo obrigatório!").nullable() }),
  edicao: object({ nome: string().required("Campo obrigatório!") }),
  observacoes: string(),
  email: string().email("E-mail inválido!").required("Campo obrigatório!"),
  ativo: string().default("T"),
});
