import { Capacitacao } from './capacitacao.model';
import { Pessoa } from './pessoa.model';
export interface Diplomado {
    pessoa: Pessoa;
    capacitacao: Capacitacao;
    local?: string;
    dataInicio?: Date;
    dataTermino?: Date;
}

