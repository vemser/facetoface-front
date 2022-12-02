import { string, object, number } from "yup";


export const schemaPassword = object({
email: string()
    .email("E-mail inválido!")
    .required("Email não pode ser vazio!")
    .matches(
      /^[a-z0-9.]+@dbccompany\.com\.br$/,
      "O e-mail deve ser @dbccompany.com.br"
    ),
})