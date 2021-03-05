import { PessoaLogada } from './../../../../models/pessoa.model';
import { Indicador } from './../../../../models/indicador.model';
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { IndicadoresFacade } from '../indicadores-facade';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-indicadores-cadastro-container',
  templateUrl: './indicadores-cadastro-container.component.html',
  styleUrls: ['./indicadores-cadastro-container.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class IndicadoresCadastroContainerComponent implements OnInit {
  public indicadores: Indicador[];
  public indicadoresSelecionados: Indicador[];
  public indicador: Indicador;
  public cursos: SelectItem[];
  public orgsSubordinadas: SelectItem[];
  public showDialogCreate = false;
  public indicadorForm: FormGroup;

  public pessoaLogada: PessoaLogada = {
    pessoa: {
      id: 15,
      nome: 'Fulano',
      organizacao: { id: 5, nome: 'Organização Logada', sigla: 'ORG5' }
    },
    roles: []
  };

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private facade: IndicadoresFacade,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.buildForm();

    this.buscarIndicadores().subscribe(response => this.indicadores = response);
  }

  buscarIndicadores(): Observable<Indicador[]> {
    return this.facade.findAllIndicadores(this.pessoaLogada.pessoa.organizacao?.cdOrg);
  }

  openDialogCreateIndicador(): void {
    this.toogleDialog();
  }

  edit(indicador: Indicador): void {
    console.log(indicador)
    this.indicador = { ...indicador };
    this.showDialogCreate = true;
  }

  deleteIndicador(indicador: Indicador): void {
    this.confirmationService.confirm({
      message: 'Deseja apagar o indicador?',
      accept: () => {
        this.facade.deleteIndicador(indicador.idIndicador)
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
      org: null,
      curso: null,
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

    this.showDialogCreate = false;
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Indicador salvo com sucesso', life: 3000 });


    // if (this.indicador) {
    //   this.indicadoresService.edit(this.indicador).subscribe(
    //     result => {
    //       this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Indicador salvo com sucesso', life: 3000 });
    //       this.buscarIndicadores();
    //     },
    //     err => {
    //       this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao editar indicador', life: 3000 });
    //     },
    //     () => {
    //       this.showDialogCreate = false;
    //       this.resetForms();
    //     }
    //   );
    // } else {
    //   let indicadorCreate: IndicadorCreateModel;

    //   indicadorCreate = {
    //     cdOrg: this.organizacaoSelecionada.id,
    //     idCurso: this.cursoSelecionado.id,
    //     dtInclusao: new Date(),
    //     dtUltimaAtualizacao: new Date(),
    //     minimo: this.indicador.minimo,
    //     ideal: this.indicador.ideal,
    //     txObsevacoes: this.indicador.txObsevacoes,
    //   };

    //   this.indicadoresService.save(indicadorCreate).subscribe(
    //     result => {
    //       this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Indicador criado com sucesso', life: 3000 });
    //       this.buscarIndicadores();
    //     },
    //     err => {
    //       this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar indicador', life: 3000 });
    //     },
    //     () => {
    //       this.showDialogCreate = false;
    //       this.resetForms();
    //     }
    //   );
    // }
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

  buildForm(): void {
    this.indicadorForm = this.fb.group({
      org: this.fb.control(null, [Validators.required]),
      curso: this.fb.control(null, [Validators.required]),
      minimo: this.fb.control(0, [Validators.required]),
      ideal: this.fb.control(0, [Validators.required]),
      observacoes: this.fb.control(''),
    });
  }

  get curso() {
    return this.indicadorForm.get('curso');
  }

  get orgSubordinada() {
    return this.indicadorForm.get('org');
  }

  toogleDialog(): void{
    this.showDialogCreate = !this.showDialogCreate;
  }

}
