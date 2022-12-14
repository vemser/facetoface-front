import { object, string } from "yup";
export const SenhaForteSchema = object({
  senhaAtual: string().required("Senha antiga é obrigatória"),
  senhaNova: string()
    .required("Campo obrigatório")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
      "Deve conter numeros, letra maiúscula e minuscula e um caractere especial"
    ),
});
