interface IObject {
  nome: string;
}

export interface ICandidate {
  nomeCompleto: string;
  cidade: string;
  estado: string;
  genero: string;
  email: string;
  observacoes: string;
  linguagens: IObject[];
  trilha: IObject;
  edicao: IObject;
}

export interface ICandidateComplete extends ICandidate{
  notaProva: number;
  ativo: string;
  idCandidato: number;
}