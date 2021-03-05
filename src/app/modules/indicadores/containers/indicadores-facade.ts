import { Diplomado } from '../../../models/diplomado.model';
import { Curso } from './../../../models/curso.model';
import { Organizacao } from './../../../models/organizacao.model';
import { Indicador } from './../../../models/indicador.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class IndicadoresFacade {
  private lista: Indicador[] = [];

  constructor() {
    for (let i = 0; i < 9; i++) {
      this.lista.push(this.gerarIndicador('32310'));
    }
  }

  findIndicadores(idOrganizacao: number): Observable<Indicador[]> {
    const indicadores: Indicador[] = [];

    for (let i = 0; i < 20; i++) {
      indicadores.push(this.gerarIndicador('32310'));
    }

    return of(indicadores);
  }

  findAllIndicadores(idOrg: string | undefined): Observable<Indicador[]> {
    return of(this.lista);
  }

  findIndicadoresOrganizacoesESubordinadas(idOrgSuperior: number): Observable<Indicador[]> {
    const indicadores: Indicador[] = [];

    for (let i = 0; i < 20; i++) {
      indicadores.push(this.gerarIndicador('32310'));
    }

    for (let i = 0; i < 10; i++) {
      indicadores.push(this.gerarIndicador('32311'));
    }

    for (let i = 0; i < 2; i++) {
      indicadores.push(this.gerarIndicador('32312'));
    }

    for (let i = 0; i < 7; i++) {
      indicadores.push(this.gerarIndicador('32313'));
    }

    this.shuffle(indicadores);

    return of(indicadores);
  }

  findIndicadoresPorCursoOrganizacao(idOrg: number, idCurso: number | undefined): Observable<Indicador[]> {
    const indicadores: Indicador[] = [];

    for (let i = 0; i < 20; i++) {
      indicadores.push(this.gerarIndicador('32310'));
    }

    return of(indicadores);
  }

  findIndicadoresPorCursoOrganizacaoSubordinadas(idOrg: number, idCurso: number | undefined): Observable<Indicador[]> {
    const indicadores: Indicador[] = [];

    for (let i = 0; i < 20; i++) {
      indicadores.push(this.gerarIndicador('32310'));
    }

    for (let i = 0; i < 10; i++) {
      indicadores.push(this.gerarIndicador('32311'));
    }

    for (let i = 0; i < 2; i++) {
      indicadores.push(this.gerarIndicador('32312'));
    }

    for (let i = 0; i < 7; i++) {
      indicadores.push(this.gerarIndicador('32313'));
    }

    this.shuffle(indicadores);

    return of(indicadores);
  }

  deleteIndicador(idIndicador: number | undefined): Observable<any> {
    return of([]);
  }

  findOrganizacoesSubordinadas(idOrg: string | undefined): Observable<Organizacao[]> {
    return of([
      { id: 1, nome: 'Organização 01', sigla: 'ORG1' },
      { id: 2, nome: 'Organização 02', sigla: 'ORG2' },
      { id: 3, nome: 'Organização 03', sigla: 'ORG3' },
      { id: 4, nome: 'Organização 04', sigla: 'ORG4' },
      { id: 5, nome: 'Organização 05', sigla: 'ORG5' },
      { id: 6, nome: 'Organização 06', sigla: 'ORG6' }
    ]);
  }

  findAllCapacitacao(): Observable<Curso[]> {
    return of([
      { id: 1, nome: 'Curso 1', sigla: 'C1' },
      { id: 2, nome: 'Curso 2', sigla: 'C2' },
      { id: 3, nome: 'Curso 3', sigla: 'C3' },
      { id: 4, nome: 'Curso 4', sigla: 'C4' },
      { id: 5, nome: 'Curso 5', sigla: 'C5' },
      { id: 6, nome: 'Curso 6', sigla: 'C6' },
      { id: 7, nome: 'Curso 7', sigla: 'C7' },
      { id: 8, nome: 'Curso 8', sigla: 'C8' },
      { id: 9, nome: 'Curso 9', sigla: 'C9' },
      { id: 10, nome: 'Curso 10', sigla: 'C10' }
    ]);
  }

  findAllDiplomados(data: any): Observable<Diplomado[]> {
    const dip: Diplomado = {
      nome: 'Pessoa',
      quadro: 'QCOA',
      posto: '1T',
      especialidade: 'ANS',
      idOrgRealizacao: '2',
      sgOrgRealizacao: 'CCA-RJ',
      dataInicio: new Date(),
      dataTermino: new Date(),
    };

    const diplomados: Diplomado[] = [];

    for (let i = 0; i < 30; i++) {
      diplomados.push(dip);
    }

    return of(diplomados);
  }


  /* *************************TEMP********************************* */
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  gerarIndicador(idOrg: string): Indicador {
    const indicador: Indicador = {
      idIndicador: this.getRandomInt(1, 1000),
      minimo: this.getRandomInt(1, 5),
      ideal: this.getRandomInt(1, 5),
      cdOrg: idOrg,
      nmOrganizacao: 'Diretoria...',
      sgOrganizacao: 'DIRAP',
      idCurso: this.getRandomInt(1, 1000),
      sgCurso: 'CAS',
      nmCurso: 'Curso de Aperfeiçoamento ',
      dtInclusao: new Date(),
      dtUltimaAtualizacao: new Date(),
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
