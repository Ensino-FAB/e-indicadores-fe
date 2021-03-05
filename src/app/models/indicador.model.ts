export interface Indicador {
    idIndicador?: number;
    minimo: number;
    ideal: number;
    cdOrg: string;
    nmOrganizacao: string;
    sgOrganizacao: string;
    idCurso: number;
    sgCurso: string;
    nmCurso: string;
    dtInclusao: Date;
    dtUltimaAtualizacao: Date;
    existente: number;
    gapMinimo: number;
    gapIdeal: number;
    txObsevacoes: string;
}

export interface IndicadorCreate {
    cdOrg: string;
    idCurso: number;
    dtInclusao: Date;
    dtUltimaAtualizacao: Date;
    minimo: number;
    ideal: number;
    txObsevacoes: string;
}

export interface IndicadorAgrupado {
    idCurso: number;
    indicadores: Indicador[];
}