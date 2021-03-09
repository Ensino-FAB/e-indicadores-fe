import { OrganizacaoService } from './../../../service/organizacao.service';
import { IndicadoresService } from './../../../service/indicadores.service';
import { Diplomado } from '../../../models/diplomado.model';
import { Capacitacao } from '../../../models/capacitacao.model';
import { Organizacao } from './../../../models/organizacao.model';
import { Indicador, IndicadorCreate } from './../../../models/indicador.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class IndicadoresFacade {
  private lista: Indicador[] = [];

  constructor(
    private indicadoresService: IndicadoresService,
    private organizacaoService: OrganizacaoService
  ) {
    for (let i = 0; i < 9; i++) {
      this.lista.push(this.gerarIndicador('32310'));
    }
  }

  createIndicador(indicador: IndicadorCreate): Observable<Indicador> {
    //return this.http.post(`${this.endpoint}/cadastro/evento/${idEvento}`, record).pipe(take(1)) as Observable<Indicacao>;
    return of(this.lista[0]);
  }

  editIndicador(indicador: IndicadorCreate): Observable<Indicador> {
    return of(this.lista[0]);
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

  findOrganizacoesSubordinadas(idOrg: string): Observable<Organizacao[]> {
    return this.organizacaoService.findOrganizacoesSubordinadas(idOrg).pipe(take(1));
  }

  findAllCapacitacao(): Observable<Capacitacao[]> {
    return of([
      { id: 1, nome: 'Curso 1', codigo: 'C1' },
      { id: 2, nome: 'Curso 2', codigo: 'C2' },
      { id: 3, nome: 'Curso 3', codigo: 'C3' },
      { id: 4, nome: 'Curso 4', codigo: 'C4' },
      { id: 5, nome: 'Curso 5', codigo: 'C5' },
      { id: 6, nome: 'Curso 6', codigo: 'C6' },
      { id: 7, nome: 'Curso 7', codigo: 'C7' },
      { id: 8, nome: 'Curso 8', codigo: 'C8' },
      { id: 9, nome: 'Curso 9', codigo: 'C9' },
      { id: 10, nome: 'Curso 10', codigo: 'C10' }
    ]);
  }

  findAllDiplomados(data: any): Observable<Diplomado[]> {
    const dip: Diplomado = {
      pessoa: {
        id: this.getRandomInt(1, 1000),
        nome: 'pessoa',
        nrCpf: '012345678910',
        nrOrdem: '1234567',
        siglaPosto: '1T',
        organizacao: { id: this.getRandomInt(1, 1000), nome: 'Diretoria de ...', sigla: 'DIRAP', cdOrg: '313435' }
      },
      capacitacao: { id: 10, nome: 'Curso 10', codigo: 'C10' },
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
      txObservacoes: 'Observações...'
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
