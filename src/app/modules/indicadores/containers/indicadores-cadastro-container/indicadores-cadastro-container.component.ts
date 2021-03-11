import { UserService } from 'src/app/service/user.service';

import { Indicador, IndicadorCreate } from './../../../../models/indicador.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IndicadoresFacade } from '../indicadores-facade';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { concatMap } from 'rxjs/operators';
import { LoadingBarService } from 'src/app/shared/services/loading-bar.service';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';


@Component({
  selector: 'app-indicadores-cadastro-container',
  templateUrl: './indicadores-cadastro-container.component.html',
  styleUrls: ['./indicadores-cadastro-container.component.scss'],
  providers: [ConfirmationService]
})
export class IndicadoresCadastroContainerComponent implements OnInit, OnDestroy {
  public indicadores: Indicador[];
  public indicadoresSelecionados: Indicador[];
  public indicador: Indicador;
  public capacitacoes: SelectItem[];
  public orgsSubordinadas: SelectItem[];
  public showDialogCreate = false;
  public indicadorForm: FormGroup;
  private subs$: Subscription[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private facade: IndicadoresFacade,
    private fb: FormBuilder,
    private loading: LoadingBarService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {

    this.buildForm();
    this.loading.start();
    this.subs$.push(
      this.buscarIndicadores()
        .subscribe(response => {
          this.indicadores = [...response];
          this.loading.end();
        }
        )
    );
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  buscarIndicadores(): Observable<Indicador[]> {
    return this.facade.findAllIndicadoresOrgESubordinadas(this.userService.user.organizacao);
  }

  openDialogCreateIndicador(): void {
    this.toogleDialog();
  }

  edit(indicador: Indicador): void {
    const { id, organizacao, capacitacao, minimo, ideal, txObsevacoes } = indicador;

    this.indicadorForm.patchValue({
      id,
      org: { value: organizacao },
      capacitacao: { value: capacitacao },
      minimo,
      ideal,
      txObsevacoes
    });

    this.toogleDialog();
  }

  deleteIndicador(indicador: Indicador): void {
    const getindicadores$ = this.buscarIndicadores();

    this.confirmationService.confirm({
      message: 'Deseja apagar o indicador?',
      accept: () => {
        this.subs$.push(
          this.facade.deleteIndicador(indicador.id)
            .pipe(
              concatMap(() => getindicadores$)
            ).subscribe(
              response => {
                this.indicadores = [...response];
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Indicador apagado com sucesso'});
              },
              () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao apagar indicador', life: 3000 }))
        );
      }
    });
  }

  saveIndicador(): void {
    const { org, capacitacao, ideal, minimo, txObsevacoes } = this.indicadorForm.value;

    const data: IndicadorCreate = {
      idcapacitacao: capacitacao.value.id,
      idorganizacao: org.value.id,
      ideal,
      minimo,
      txObsevacoes
    };

    const getindicadores$ = this.buscarIndicadores();

    if (!this.indicadorId) {
      const createIndicador$ = this.facade.createIndicador(data);
      this.subs$.push(
        createIndicador$.pipe(
          concatMap(() => getindicadores$)
        ).subscribe(response => {
          this.indicadores = [...response];
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Indicador salvo com sucesso', life: 3000 });
        })
      );
    } else {
      const editIndicador$ = this.facade.editIndicador(this.indicadorId, data);
      this.subs$.push(
        editIndicador$.pipe(
          concatMap(() => getindicadores$)
        ).subscribe(response => {
          this.indicadores = [...response];
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Indicador editado com sucesso', life: 3000 });
        })
      );
    }

    this.hideDialog();
  }

  searchCapacitacao(event: any): void {
    this.facade.findAllCapacitacao({ nome: event.query }).subscribe(response => {
      this.capacitacoes = response.content.map(capacitacao => ({
        label: capacitacao.codigo,
        title: capacitacao.nome,
        value: capacitacao
      }));
    }
    );
  }

  searchOrgsSubordinadas(event: any): void {
    const orgPessoaLogada = this.userService.user.organizacao;
    this.facade.findOrganizacoesSubordinadas(orgPessoaLogada.cdOrg)
      .subscribe(response => {
        const itens = response.map(org => {
          const item: SelectItem = { label: org.sigla, title: org.nome, value: org };
          return item;
        });
        this.orgsSubordinadas = [
          { label: orgPessoaLogada?.sigla, title: orgPessoaLogada?.nome, value: orgPessoaLogada },
          ...itens
        ];

      });
  }

  buildForm(): void {
    this.indicadorForm = this.fb.group({
      id: this.fb.control(null),
      org: this.fb.control(null, [Validators.required]),
      capacitacao: this.fb.control(null, [Validators.required]),
      minimo: this.fb.control(0, [Validators.required]),
      ideal: this.fb.control(0, [Validators.required]),
      txObsevacoes: this.fb.control(''),
    });
  }

  resetForms(): void {
    this.indicadorForm.reset({
      id: null,
      org: null,
      capacitacao: null,
      minimo: 0,
      ideal: 0,
      txObsevacoes: '',
    });
  }

  hideDialog(): void {
    this.resetForms();
    this.toogleDialog();
  }

  get capacitacao() {
    return this.indicadorForm.get('capacitacao');
  }

  get orgSubordinada() {
    return this.indicadorForm.get('org');
  }

  get indicadorId() {
    return this.indicadorForm.get('id').value;
  }

  toogleDialog(): void {
    this.showDialogCreate = !this.showDialogCreate;
  }

}
