import {Organizacao} from './organizacao.model';
import {BaseModel} from './base.model';

export interface Pessoa extends BaseModel {
  nome: string;
  nrCpf: string;
  nrOrdem?: string;
  siglaPosto?: string;
  organizacao?: Organizacao;
}
