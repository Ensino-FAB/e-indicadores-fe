import {Organizacao} from './organizacao.model';
import {BaseModel} from './base.model';

export interface Pessoa extends BaseModel {
  nome?: string;
  nrCpf?: string;
  nrOrdem?: string;
  siglaPosto?: string;
  email?: string;
  contatoPrincipal?: string;
  organizacao?: Organizacao;
}

export interface PessoaLogada{
  pessoa: Pessoa;
  roles: string[];
}
