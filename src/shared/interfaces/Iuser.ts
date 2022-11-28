export interface IPerfis{
  nome:string
}

export interface IUser {
    nomeCompleto: string;
    cidade: string;
    estado: string;
    email: string;
    genero: "FEMININO" | "MASCULINO" | "OUTRO";
    trilha: string;
    perfis: IPerfis[];
  }
  