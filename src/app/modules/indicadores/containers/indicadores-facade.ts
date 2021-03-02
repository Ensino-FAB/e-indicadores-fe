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

  findAllIndicadores(cdOrg: string): Observable<Indicador[]> {
    return of(this.lista);
  }

  deleteIndicador(idIndicador: number| undefined): Observable<any> {
    return of([]);
  }


  /* *************************TEMP********************************* */
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  gerarIndicador(): Indicador{
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
