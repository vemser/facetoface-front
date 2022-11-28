export interface IPerfis{
  nome:string
}

export interface IUser {
    nomeCompleto: string;
    cidade: string;
    estado: string;
    email: string;
    genero: "FEMININO" | "MASCULINO" | "OUTRO";
    edicao: string;
    perfis: IPerfis[];
  }
  