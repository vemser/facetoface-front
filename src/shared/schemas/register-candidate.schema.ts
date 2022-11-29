import { string, object, number } from "yup";

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
  notaProva: number().default(0),
});

export const schemaCandidateComplete = object({
  idCandidato: number(),
  nomeCompleto: string().required("Campo obrigatório!"),
  genero: string().required("Campo obrigatório!").nullable(),
  cidade: string().required("Campo obrigatório!"),
  estado: string().required("Campo obrigatório!"),
  trilha: object({ nome: string().required("Campo obrigatório!").nullable() }),
  edicao: object({ nome: string().required("Campo obrigatório!") }),
  observacoes: string().nullable(),
  email: string().email("E-mail inválido!").required("Campo obrigatório!"),
  ativo: string(),
  notaProva: number(),
});
