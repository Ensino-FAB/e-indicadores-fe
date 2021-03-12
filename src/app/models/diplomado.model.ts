import { Capacitacao } from './capacitacao.model';
import { Pessoa } from './pessoa.model';
export interface Diplomado {
    pessoaResponse: Pessoa;
    capacitacaoResponse: Capacitacao;
    local?: string;
    dtInicio?: Date;
    dtFim?: Date;
}