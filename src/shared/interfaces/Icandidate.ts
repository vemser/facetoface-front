interface ILanguages {
  nome: string;
}

export interface ICandidate {
  nomeCompleto: string;
  cidade: string;
  estado: string;
  genero: string;
  email: string;
  observacoes: string;
  linguagens: ILanguages[];
  trilha: ILanguages;
  edicao: ILanguages;
}
