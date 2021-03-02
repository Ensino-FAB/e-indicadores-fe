import { BaseModel } from './base.model';

export interface Organizacao extends BaseModel {
    nome: string;
    sigla: string;
    cdOrg?: number;
}
