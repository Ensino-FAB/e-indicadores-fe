import { UserService } from 'src/app/service/user.service';

import { Indicador, IndicadorCreate } from './../../../../models/indicador.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { IndicadoresFacade } from '../indicadores-facade';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-indicadores-cadastro-container',
  templateUrl: './indicadores-cadastro-container.component.html',
  styleUrls: ['./indicadores-cadastro-container.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class IndicadoresCadastroContainerComponent implements OnInit, OnDestroy {
  public indicadores: Indicador[];
  public indicadoresSelecionados: Indicador[];
  public indicador: Indicador;
  public capacitacoes: SelectItem[];
  public orgsSubordinadas: SelectItem[];
  public showDialogCreate = false;
  public indicadorForm: FormGroup;
  private subscriptions: Subscription;

  public pessoaLogada: any = {
    id: 15,
    nome: 'Fulano',
    nrCpf: '12345678910',
    organizacao: { id: 5, nome: 'Organização Logada', sigla: 'ORG5' },
    roles: []
  };

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private facade: IndicadoresFacade,
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.buscarIndicadores().subscribe(response => this.indicadores = response);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  buscarIndicadores(): Observable<Indicador[]> {
    return this.facade.findAllIndicadores(this.pessoaLogada.organizacao?.cdOrg);
  }

  openDialogCreateIndicador(): void {
    this.toogleDialog();
  }

  edit(indicador: Indicador): void {
    this.indicador = { ...indicador };
    this.showDialogCreate = true;
  }

  deleteIndicador(indicador: Indicador): void {
    this.confirmationService.confirm({
      message: 'Deseja apagar o indicador?',
      accept: () => {
        this.facade.deleteIndicador(indicador.id)
          .subscribe(
            () => {
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Indicador apagado com sucesso' });
              this.buscarIndicadores();
            },
            e => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao apagar indicador', life: 3000 }));
      }
    });
  }

  resetForms(): void {
    this.indicadorForm.reset({
      id: null,
      org: null,
      capacitacao: null,
      minimo: 0,
      ideal: 0,
      observacoes: '',
    });
  }

  hideDialog(): void {
    this.resetForms();
    this.toogleDialog();
  }

  saveIndicador(): void {
    const { org, capacitacao, ideal, minimo, txObservacoes } = this.indicadorForm.value;

    const data: IndicadorCreate = {
      idCapacitacao: capacitacao.value.id,
      idOrganizacao: org.value.id,
      ideal,
      minimo,
      txObservacoes
    }

    if (!this.indicadorId) {


      this.facade.createIndicador(data).subscribe(response => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Indicador salvo com sucesso', life: 3000 });
        console.log('dado salvo', response);
      });
    } else {
      this.facade.editIndicador(data).subscribe(response => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Indicador editado com sucesso', life: 3000 });
        console.log('dado editado', response);
      });
    }

    this.hideDialog();
  }

  searchCapacitacao(event: any): void {
    this.facade.findAllCapacitacao().subscribe(response => {
      this.capacitacoes = response.map(capacitacao => ({
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
      observacoes: this.fb.control(''),
    });
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
