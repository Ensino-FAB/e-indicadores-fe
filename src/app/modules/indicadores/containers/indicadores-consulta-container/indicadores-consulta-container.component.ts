import { IndicadoresFacade } from './../indicadores-facade';
import { Indicador, IndicadorAgrupado } from './../../../../models/indicador.model';
import { Curso } from './../../../../models/curso.model';
import { Organizacao } from './../../../../models/organizacao.model';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-indicadores-consulta-container',
  templateUrl: './indicadores-consulta-container.component.html',
  styleUrls: ['./indicadores-consulta-container.component.scss']
})
export class IndicadoresConsultaContainerComponent implements OnInit {

  public organizacaoSelecionada: Organizacao;
  public listaOrganizacoesSubordinadas: Organizacao[];
  public cursoSelecionado: Curso;
  public listaDeCursos: SelectItem[];
  public cdOrgLogado: string;
  public subordinadas = false;
  public indicadores: Indicador[];
  public indicadoresAgrupados: IndicadorAgrupado[] = [];
  public idCursos: number;
  public showTableOmIndicadores: boolean;

  constructor(private facade: IndicadoresFacade) {

  }

  ngOnInit(): void {
    //Buscar pessoa Logada
    this.facade.findOrganizacoesSubordinadas(this.cdOrgLogado)
      .subscribe(response => this.listaOrganizacoesSubordinadas = response);
    this.facade.findAllCapacitacao().subscribe(response =>
      this.listaDeCursos = response.map(curso => ({
        label: curso.sigla,
        value: curso
      }))
    );
  }

  buscarIndicadores(): void {
    this.indicadoresAgrupados = [];
    this.indicadores = [];
    this.showTableOmIndicadores = false;

    if (!this.subordinadas) {
      if (!this.cursoSelecionado) {
        this.facade.findIndicadores(this.organizacaoSelecionada.id)
          .subscribe(response => {
            this.showTableOmIndicadores = true;
            this.indicadores = response;
          });
        return;
      }

      if (this.cursoSelecionado) {
        this.facade.findIndicadoresPorCursoOrganizacao(this.organizacaoSelecionada.id, this.cursoSelecionado.id)
          .subscribe(response => {
            this.fillIndicadoresAgrupados(response);
          });
        return;
      }
    } else {
      if (!this.cursoSelecionado) {
        this.facade.findIndicadoresOrganizacoesESubordinadas(this.organizacaoSelecionada.id)
          .subscribe(response => {
            this.fillIndicadoresAgrupados(response);
          });
        return;
      }

      if (this.cursoSelecionado) {
        this.facade.findIndicadoresPorCursoOrganizacaoSubordinadas(this.organizacaoSelecionada.id, this.cursoSelecionado.id)
          .subscribe(response => {
            this.fillIndicadoresAgrupados(response);
          });
        return;
      }
    }
  }

  fillIndicadoresAgrupados(response: Indicador[]): void {
    const idCursoSet = new Set<number>();
    response.map(indicador => indicador.idCurso).forEach(idCurso => idCursoSet.add(idCurso));
    idCursoSet.forEach(idCurso => {
      this.indicadoresAgrupados.push(
        {
          idCurso,
          indicadores: response.filter(indicador => indicador.idCurso === idCurso)
        }
      );
    });
  }

}
