import { IndicadoresFacade } from './../indicadores-facade';
import { Indicador, IndicadorAgrupado } from './../../../../models/indicador.model';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
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

  public pessoaLogada: any;

  constructor(
    private facade: IndicadoresFacade,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.buildForm();

    this.pessoaLogada = {
      id: 15,
      nome: 'Fulano',
      nrCpf: '12345678910',
      organizacao: { id: 5, nome: 'Organização Logada', sigla: 'ORG5' },
      roles: []
    };
    this.org?.setValue(
      {
        label: this.pessoaLogada.organizacao?.sigla,
        title: this.pessoaLogada.organizacao?.nome,
        value: this.pessoaLogada.organizacao
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
        label: curso.codigo,
        title: curso.nome,
        value: curso
      }))
    );
  }

  buscarIndicadores(): void {
    this.indicadoresAgrupados = [];
    this.indicadores = [];
    this.showTableOmIndicadores = false;

    const cursoSelecionado = this.curso?.value;
    const organizacaoSelecionada = this.org?.value;

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
    const idCapacitacaoSet = new Set<number>();
    response.map(indicador => indicador.capacitacao.id).forEach(idCapacitacao => idCapacitacaoSet.add(idCapacitacao));
    idCapacitacaoSet.forEach(idCapacitacao => {
      this.indicadoresAgrupados.push(
        {
          idCapacitacao,
          indicadores: response.filter(indicador => indicador.capacitacao.id === idCapacitacao)
        }
      );
    });
  }

  searchCursos(event: any): void {
    this.facade.findAllCapacitacao().subscribe(response => {
      this.cursos = response.map(curso => ({
        label: curso.codigo,
        title: curso.nome,
        value: curso
      }));
    }
    );
  }

  searchOrgsSubordinadas(event: any): void {
    this.facade.findOrganizacoesSubordinadas(this.pessoaLogada.organizacao?.cdOrg)
      .subscribe(response => {
        const orgLogada = this.pessoaLogada.organizacao;

        const itens = response.map(org => {
          const item: SelectItem = { label: org.sigla, title: org.nome, value: org };
          return item;
        }).filter(org => org.value.id !== orgLogada?.id);
        this.orgsSubordinadas = [
          { label: orgLogada?.sigla, title: orgLogada?.nome, value: orgLogada },
          ...itens
        ];
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
