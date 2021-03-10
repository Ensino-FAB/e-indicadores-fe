import { Organizacao } from './organizacao.model';
import { BaseModel } from './base.model';
import { Capacitacao } from './capacitacao.model';
export interface Indicador extends BaseModel{
    capacitacao: Capacitacao;
    organizacao: Organizacao;
    dataCriacao: Date;
    dataModificacao: Date;
    existente: number;
    minimo: number;
    ideal: number;
    gapMinimo: number;
    gapIdeal: number;
    txObsevacoes: string;
}

export interface IndicadorCreate {
    idorganizacao: number;
    idcapacitacao: number;
    minimo: number;
    ideal: number;
    txObsevacoes?: string;
}

export interface IndicadorAgrupado {
    idCapacitacao: number;
    indicadores: Indicador[];
}