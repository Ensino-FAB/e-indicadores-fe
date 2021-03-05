import { IndicadoresFacade } from './../indicadores-facade';
import { Indicador, IndicadorAgrupado } from './../../../../models/indicador.model';
import { Curso } from './../../../../models/curso.model';
import { Organizacao } from './../../../../models/organizacao.model';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PessoaLogada } from './../../../../models/pessoa.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-indicadores-consulta-container',
  templateUrl: './indicadores-consulta-container.component.html',
  styleUrls: ['./indicadores-consulta-container.component.scss']
})
export class IndicadoresConsultaContainerComponent implements OnInit {

  public orgsSubordinadas: SelectItem[];
  public cursos: SelectItem[];
  public cdOrgLogado: string;
  public indicadores: Indicador[];
  public indicadoresAgrupados: IndicadorAgrupado[] = [];
  public idCursos: number;
  public showTableOmIndicadores: boolean;
  public subordinadas = false;

  public consultaForm: FormGroup;

  public pessoaLogada: PessoaLogada;

  constructor(
    private facade: IndicadoresFacade,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.buildForm();

    this.pessoaLogada = {
      pessoa: {
        id: 15,
        nome: 'Fulano',
        organizacao: { id: 5, nome: 'Organização Logada', sigla: 'ORG5' }
      },
      roles: []
    };
    this.org?.setValue(
      {
        label: this.pessoaLogada.pessoa.organizacao?.sigla,
        title: this.pessoaLogada.pessoa.organizacao?.nome,
        value: this.pessoaLogada.pessoa.organizacao
      }
    );

    this.facade.findOrganizacoesSubordinadas(this.cdOrgLogado)
      .subscribe(
        response =>
          this.orgsSubordinadas = response.map(org => {
            const item: SelectItem = { label: org.sigla, title: org.nome, value: org };
            return item;
          })
      );


    this.facade.findAllCapacitacao().subscribe(response =>
      this.cursos = response.map(curso => ({
        label: curso.sigla,
        title: curso.nome,
        value: curso
      }))
    );
  }

  buscarIndicadores(): void {
    this.indicadoresAgrupados = [];
    this.indicadores = [];
    this.showTableOmIndicadores = false;

    let cursoSelecionado = this.curso?.value;
    let organizacaoSelecionada = this.org?.value;

    if (!this.subordinadas) {
      if (!cursoSelecionado) {
        this.facade.findIndicadores(organizacaoSelecionada.id)
          .subscribe(response => {
            this.showTableOmIndicadores = true;
            this.indicadores = response;
          });
        return;
      }

      if (cursoSelecionado) {
        this.facade.findIndicadoresPorCursoOrganizacao(organizacaoSelecionada.id, cursoSelecionado.id)
          .subscribe(response => {
            this.fillIndicadoresAgrupados(response);
          });
        return;
      }
    } else {
      if (!cursoSelecionado) {
        this.facade.findIndicadoresOrganizacoesESubordinadas(organizacaoSelecionada.id)
          .subscribe(response => {
            this.fillIndicadoresAgrupados(response);
          });
        return;
      }

      if (cursoSelecionado) {
        this.facade.findIndicadoresPorCursoOrganizacaoSubordinadas(organizacaoSelecionada.id, cursoSelecionado.id)
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

  searchCursos(event: any): void {
    this.facade.findAllCapacitacao().subscribe(response => {
      this.cursos = response.map(curso => ({
        label: curso.sigla,
        title: curso.nome,
        value: curso
      }));
    }
    );
  }

  searchOrgsSubordinadas(event: any): void {
    this.facade.findOrganizacoesSubordinadas(this.pessoaLogada.pessoa.organizacao?.cdOrg)
      .subscribe(response => {
        const orgLogada = this.pessoaLogada.pessoa.organizacao;

        const itens = response.map(org => {
          const item: SelectItem = { label: org.sigla, title: org.nome, value: org };
          return item;
        }).filter(org => org.value.id !== orgLogada?.id);
        this.orgsSubordinadas = itens;

        this.orgsSubordinadas.unshift({ label: orgLogada?.sigla, title: orgLogada?.nome, value: orgLogada })
      });
  }

  resetForms(): void {
    this.consultaForm.reset({
      org: null,
      curso: null,
    });
  }

  buildForm(): void {
    this.consultaForm = this.fb.group({
      org: this.fb.control(null),
      curso: this.fb.control(null),
    });
  }

  get curso() {
    return this.consultaForm.get('curso');
  }

  get org() {
    return this.consultaForm.get('org');
  }

}
