import { string, object } from "yup";

export const schemaUser = object({
  nomeCompleto: string().required("Campo obrigatório!"),
  genero: string().required("Campo obrigatório!").nullable(),
  cidade: string().required("Campo obrigatório!"),
  estado: string().required("Campo obrigatório!"),
  email: string()
    .email("E-mail inválido!")
    .matches(
      /^[a-z0-9.]+@dbccompany\.com\.br$/,
      "O e-mail deve ser @dbccompany.com.br"
    )
    .required("Campo obrigatório!"),
  trilha: object().default({ nome: "COLABORADOR" }),
  ativo: string().default("T"),
});
