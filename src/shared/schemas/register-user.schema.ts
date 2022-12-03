import { string, object } from "yup";

export const schemaUser = object({
  nomeCompleto: string()
    .required("Nome completo é obrigatório!")
    .matches(/^([^0-9]*)$/, "Números não são permitidos!")
    .matches(
      /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
      "Nome completo não pode conter caracteres epeciais"
    )
    .matches(/[A-Za-z]*  *[A-Za-z]/, "Por favor insira o sobrenome!"),
  genero: string().required("Gênero é obrigatório!").nullable(),
  cidade: string()
    .required("Cidade é obrigatório!")
    .matches(/^([^0-9]*)$/, "Números não são permitidos!")
    .matches(
      /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
      "Cidade não pode conter caracteres epeciais"
    ),
  estado: string()
    .required("Estado é obrigatório!")
    .matches(/^([^0-9]*)$/, "Números não são permitidos!")
    .matches(
      /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
      "Estado não pode conter caracteres epeciais"
    ),
  email: string()
    .email("E-mail inválido!")
    .required("Email é obrigatório!")
    .matches(
      /^[a-z0-9.]+@dbccompany\.com\.br$/,
      "O e-mail deve ser @dbccompany.com.br"
    ),
  trilha: object().default({ nome: "COLABORADOR" }),
  ativo: string().default("T"),
  // tipo: string().required("Tipo não pode ser vazio!")
});
