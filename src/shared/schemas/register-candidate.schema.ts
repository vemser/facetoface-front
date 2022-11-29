import { string, object, number } from "yup";

export const schemaCandidate = object({
  nomeCompleto: string().required("Nome completo é obrigatório!").matches(/^([^0-9]*)$/, "Números não são permitidos!").matches(/[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, "Nome completo não pode conter caracteres epeciais").matches(/[a-z] [a-z]/, "Por favor insira o sobrenome!"),
  genero: string().required("Gênero é obrigatório!").nullable(),
  cidade: string().required("Cidade é obrigatório!").matches(/^([^0-9]*)$/, "Números não são permitidos!").matches(/[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, "Cidade não pode conter caracteres epeciais"),
  estado: string().required("Estado é obrigatório!").matches(/^([^0-9]*)$/, "Números não são permitidos!").matches(/[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, "Estado não pode conter caracteres epeciais"),
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
  nomeCompleto: string().required("Nome é obrigatório!").matches(/^([^0-9]*)$/, "Números não são permitidos!").matches(/[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, "Nome completo não pode conter caracteres epeciais!").matches(/[a-z] [a-z]/, "Por favor insira o sobrenome!"),
  genero: string().required("Gênero é obrigatório!").nullable(),
  cidade: string().required("Cidade é obrigatório!").matches(/^([^0-9]*)$/, "Números não são permitidos!").matches(/[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, "Cidade não pode conter caracteres epeciais"),
  estado: string().required("Estado é obrigatório!").matches(/^([^0-9]*)$/, "Números não são permitidos!").matches(/[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, "Estado não pode conter caracteres epeciais"),
  trilha: object({
    nome: string().required("Trilha é obrigatório!"),
  }),
  edicao: object({ nome: string().required("Edição é obrigatório!") }),
  observacoes: string().nullable(),
  email: string().email("E-mail inválido!").required("E-mail é obrigatório!"),
  ativo: string(),
  notaProva: number(),
});
