import { BaseModel } from './base.model';
export interface Capacitacao extends BaseModel{
    nome: string;
    codigo: string;
}

export interface CapacitacaoSearchModel{
    nome?: string;
    codigo?: string;
}