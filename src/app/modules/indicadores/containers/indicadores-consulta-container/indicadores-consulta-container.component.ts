import { UserService } from 'src/app/service/user.service';
import { IndicadoresFacade } from './../indicadores-facade';
import { Indicador, IndicadorAgrupado } from './../../../../models/indicador.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-indicadores-consulta-container',
  templateUrl: './indicadores-consulta-container.component.html',
  styleUrls: ['./indicadores-consulta-container.component.scss']
})
export class IndicadoresConsultaContainerComponent implements OnInit, OnDestroy {

  public orgsSubordinadas: SelectItem[];
  public cursos: SelectItem[];
  public cdOrgLogado: string;
  public indicadores: Indicador[];
  public indicadoresAgrupados: IndicadorAgrupado[] = [];
  public idCursos: number;
  public showTableOmIndicadores: boolean;
  public incluirSubordinadas = false;
  private subs$: Subscription[] = [];

  public consultaForm: FormGroup;

  constructor(
    private indicadoresFacade: IndicadoresFacade,
    private fb: FormBuilder,
    private messageService: MessageService,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.buildForm();

    this.subs$.push(
      this.indicadoresFacade.findOrganizacoesSubordinadas(this.userService.user.organizacao.cdOrg)
        .subscribe(
          response =>
            this.orgsSubordinadas = response.map(org => {
              const item: SelectItem = { label: org.sigla, title: org.nome, value: org };
              return item;
            })
        )
    );
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  buscarIndicadores(): void {
    this.indicadoresAgrupados = [];
    this.indicadores = [];
    this.showTableOmIndicadores = false;

    const selectedItemCurso: SelectItem = this.curso?.value;
    const selectedItemOrg: SelectItem = this.org?.value;

    if (selectedItemCurso === null && selectedItemOrg === null) {
      this.messageService.add(
        {
          severity: 'warn',
          summary: 'Atenção',
          detail: 'Selecione uma organização ou capacitação para realizar a pesquisa',
          life: 3000
        }
      );
      return;
    }

    if (selectedItemCurso && !selectedItemOrg) {
      this.indicadoresFacade.findAllIndicadoresByCapacitacao(selectedItemCurso.value.id)
        .subscribe(response => {
          this.fillIndicadoresAgrupados(response);
        })
      return;
    }

    if (!this.incluirSubordinadas) {
      if (!selectedItemCurso) {
        this.subs$.push(
          this.indicadoresFacade.findAllIndicadoresByOrg(selectedItemOrg.value.id)
            .subscribe(response => {
              this.indicadores = response;
              this.showTableOmIndicadores = true;
            })
        );
        return;
      }

      if (selectedItemCurso) {
        this.subs$.push(
          this.indicadoresFacade.findIndicadoresPorCursoOrganizacao(selectedItemOrg.value.id, selectedItemCurso.value.id)
            .subscribe(response => {
              this.fillIndicadoresAgrupados(response);
            })
        );
        return;
      }
    } else {
      if (!selectedItemCurso) {
        this.subs$.push(
          this.indicadoresFacade.findAllIndicadoresOrgESubordinadas(selectedItemOrg.value)
            .subscribe(response => {
              this.fillIndicadoresAgrupados(response);
            })
        );
        return;
      }

      if (selectedItemCurso) {
        this.subs$.push(
          this.indicadoresFacade.findIndicadoresPorCursoOrganizacaoSubordinadas(selectedItemOrg.value, selectedItemCurso.value.id)
            .subscribe(response => {
              this.fillIndicadoresAgrupados(response);
            })
        );
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
    this.subs$.push(
      this.indicadoresFacade.findAllCapacitacao({ nome: event.query })
        .subscribe(response => {
          this.cursos = response.content.map(curso => ({
            label: curso.codigo,
            title: curso.nome,
            value: curso
          }));
        })
    );
  }

  searchOrgsSubordinadas(event: any): void {
    const orgLogada = this.userService.user.organizacao;
    this.subs$.push(
      this.indicadoresFacade.findOrganizacoesSubordinadas(orgLogada.cdOrg)
        .subscribe(response => {
          const itens = response.map(org => {
            const item: SelectItem = { label: org.sigla, title: org.nome, value: org };
            return item;
          });
          this.orgsSubordinadas = [
            { label: orgLogada?.sigla, title: orgLogada?.nome, value: orgLogada },
            ...itens
          ];
        })
    );
  }

  resetForms(): void {
    this.consultaForm.reset({
      org: null,
      curso: null,
    });

    this.indicadoresAgrupados = [];
    this.indicadores = [];
    this.showTableOmIndicadores = false;
    this.incluirSubordinadas = false;
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
