import { string, object, number } from "yup";

export const schemaCandidate = object({
  nomeCompleto: string().required("Nome é obrigatório!"),
  genero: string().required("Gênero é obrigatório!").nullable(),
  cidade: string().required("Cidade é obrigatório!"),
  estado: string().required("Estado é obrigatório!"),
  trilha: object({
    nome: string().required("Trilha é obrigatório!"),
  }),
  edicao: object({ nome: string().required("Edição é obrigatório!") }),
  observacoes: string(),
  email: string().email("E-mail inválido!").required("E-mail é obrigatório!"),
  ativo: string().default("T"),
  notaProva: number().default(0),
});

export const schemaCandidateComplete = object({
  idCandidato: number(),
  nomeCompleto: string().required("Nome é obrigatório!"),
  genero: string().required("Gênero é obrigatório!").nullable(),
  cidade: string().required("Cidade é obrigatório!"),
  estado: string().required("Estado é obrigatório!"),
  trilha: object({
    nome: string().required("Trilha é obrigatório!"),
  }),
  edicao: object({ nome: string().required("Edição é obrigatório!") }),
  observacoes: string().nullable(),
  email: string().email("E-mail inválido!").required("E-mail é obrigatório!"),
  ativo: string(),
  notaProva: number(),
});
