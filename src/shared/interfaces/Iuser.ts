export interface IPerfis {
  nome: string;
}

export interface IUser {
  nomeCompleto: string;
  cidade: string;
  estado: string;
  email: string;
  genero: "FEMININO" | "MASCULINO" | "OUTRO";
  trilha: IPerfis;
  perfis: IPerfis[];
}

export interface IUserComplete {
  nomeCompleto: string;
  cidade: string;
  estado: string;
  email: string;
  genero: "FEMININO" | "MASCULINO" | "OUTRO";
  trilha: IPerfis;
  perfis: IPerfis[];
  ativo: "T" | "F";
  idUsuario: number;
}
