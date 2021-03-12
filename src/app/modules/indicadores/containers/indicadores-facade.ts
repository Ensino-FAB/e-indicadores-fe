import { DiplomadosService } from './../../../service/diplomados.service';
import { CapacitacaoService } from './../../../service/capacitacao.service';
import { OrganizacaoService } from './../../../service/organizacao.service';
import { IndicadoresService } from './../../../service/indicadores.service';
import { Diplomado } from '../../../models/diplomado.model';
import { Capacitacao, CapacitacaoSearchModel } from '../../../models/capacitacao.model';
import { Organizacao } from './../../../models/organizacao.model';
import { Indicador, IndicadorCreate } from './../../../models/indicador.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Pageable } from 'src/app/models/pageable.model';

@Injectable()
export class IndicadoresFacade {


  constructor(
    private indicadoresService: IndicadoresService,
    private organizacaoService: OrganizacaoService,
    private capacitacaoService: CapacitacaoService,
    private diplomadosService: DiplomadosService
  ) {
  }

  createIndicador(indicador: IndicadorCreate): Observable<Indicador> {
    return this.indicadoresService.create(indicador);
  }

  editIndicador(idIndicador: string, indicadorCreate: IndicadorCreate): Observable<Indicador> {
    return this.indicadoresService.edit(idIndicador, indicadorCreate);
  }

  findAllIndicadoresByCapacitacao(idCapacitacao: number): Observable<Indicador[]> {
    return this.indicadoresService.findAllByCapacitacao(`${idCapacitacao}`);
  }

  findAllIndicadoresByOrg(idOrganizacao: number): Observable<Indicador[]> {
    return this.indicadoresService.findAllIndicadoresOrganizacao(`${idOrganizacao}`);
  }

  findAllIndicadoresOrgESubordinadas(org: Organizacao): Observable<Indicador[]> {
    const getIndicadoresSubordinadas$ = this.indicadoresService.findAllIndicadoresOrganizacoesSubordinadas(org.cdOrg);

    return this.findAllIndicadoresByOrg(org.id).pipe(switchMap(indicadores => {
      return getIndicadoresSubordinadas$.pipe(
        map(indSubordinadas => [...indicadores, ...indSubordinadas])
      );
    }));
  }

  findIndicadoresPorCursoOrganizacao(idOrg: number, idCurso: number): Observable<Indicador[]> {
    return this.indicadoresService.findAllIndicadoresByCursoOrganizacao(`${idOrg}`, `${idCurso}`);
  }

  findIndicadoresPorCursoOrganizacaoSubordinadas(org: Organizacao, idCurso: number): Observable<Indicador[]> {
    const getIndSubord$ = this.indicadoresService.findAllIndicadoresByCursoOrgSubordinada(`${org.cdOrg}`, `${idCurso}`);

    return this.indicadoresService.findAllIndicadoresByCursoOrganizacao(`${org.id}`, `${idCurso}`)
      .pipe(
        switchMap(indicadores => {
          return getIndSubord$.pipe(
            map(indSubordinadas => [...indicadores, ...indSubordinadas])
          );
        })
      );
  }

  deleteIndicador(idIndicador: number): Observable<any> {
    return this.indicadoresService.delete(idIndicador);
  }

  findOrganizacoesSubordinadas(idOrg: string): Observable<Organizacao[]> {
    return this.organizacaoService.findOrganizacoesSubordinadas(idOrg).pipe(take(1));
  }

  findAllCapacitacao(search: CapacitacaoSearchModel): Observable<Pageable<Capacitacao>> {
    return this.capacitacaoService.findAllCapacitacao(search);
  }

  findAllDiplomados(idOrg: string, capacitacaoId: string): Observable<Diplomado[]> {
    return this.diplomadosService.findAllDiplomados(idOrg, capacitacaoId);
  }


  /* *************************TEMP********************************* */
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  gerarIndicador(idOrg: string): Indicador {
    const indicador: Indicador = {
      id: this.getRandomInt(1, 1000),
      minimo: this.getRandomInt(1, 5),
      ideal: this.getRandomInt(1, 5),
      capacitacao: { id: this.getRandomInt(1, 1000), nome: 'Curso de Capacitação', codigo: 'CdC' },
      organizacao: { id: this.getRandomInt(1, 1000), nome: 'Diretoria de ...', sigla: 'DIRAP', cdOrg: '313435' },
      dataCriacao: new Date(),
      dataModificacao: new Date(),
      existente: this.getRandomInt(0, 8),
      gapMinimo: this.getRandomInt(1, 5),
      gapIdeal: this.getRandomInt(1, 6),
      txObsevacoes: 'Observações...'
    };

    return indicador;
  }

  shuffle(array: Indicador[]): Indicador[] {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
