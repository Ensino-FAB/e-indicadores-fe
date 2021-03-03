import { Curso } from './../../../models/curso.model';
import { Organizacao } from './../../../models/organizacao.model';
import { Indicador } from './../../../models/indicador.model';
import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class IndicadoresFacade {
  private lista: Indicador[] = [];

  constructor() {
    for (let i = 0; i < 9; i++) {
      this.lista.push(this.gerarIndicador());
    }
  }

  findAllIndicadores(cdOrg: string | undefined): Observable<Indicador[]> {
    return of(this.lista);
  }

  deleteIndicador(idIndicador: number | undefined): Observable<any> {
    return of([]);
  }

  findOrganizacoesSubordinadas(cdOrg: string | undefined): Observable<Organizacao[]>{
    return of([
      { id: 1, nome: 'Organização 01', sigla: 'ORG1' },
      { id: 2, nome: 'Organização 02', sigla: 'ORG2' },
      { id: 3, nome: 'Organização 03', sigla: 'ORG3' },
      { id: 4, nome: 'Organização 04', sigla: 'ORG4' },
      { id: 5, nome: 'Organização 05', sigla: 'ORG5' },
      { id: 6, nome: 'Organização 06', sigla: 'ORG6' }
    ]);
  }

  findAllCapacitacao(): Observable<Curso[]>{
    return of([
      {id: 1, nome: 'Curso 1', sigla: 'C1'},
      {id: 2, nome: 'Curso 2', sigla: 'C2'},
      {id: 3, nome: 'Curso 3', sigla: 'C3'},
      {id: 4, nome: 'Curso 4', sigla: 'C4'},
      {id: 5, nome: 'Curso 5', sigla: 'C5'},
      {id: 6, nome: 'Curso 6', sigla: 'C6'},
      {id: 7, nome: 'Curso 7', sigla: 'C7'},
      {id: 8, nome: 'Curso 8', sigla: 'C8'},
      {id: 9, nome: 'Curso 9', sigla: 'C9'},
      {id: 10, nome: 'Curso 10', sigla: 'C10'}
    ]);
  }


  /* *************************TEMP********************************* */
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  gerarIndicador(): Indicador {
    const indicador: Indicador = {
      idIndicador: this.getRandomInt(1, 1000),
      minimo: this.getRandomInt(1, 5),
      ideal: this.getRandomInt(1, 5),
      cdOrg: '32310',
      nmOrganizacao: 'Diretoria...',
      sgOrganizacao: 'DIRAP',
      idCurso: this.getRandomInt(1, 1000),
      sgCurso: 'CAS',
      nmCurso: 'Curso de Aperfeiçoamento ',
      dtInclusao: new Date(),
      dtUltimaAtualizacao: new Date(),
      existente: this.getRandomInt(1, 8),
      gapMinimo: this.getRandomInt(1, 5),
      gapIdeal: this.getRandomInt(1, 6),
      txObsevacoes: 'Observações...'
    };

    return indicador;
  }
}
