import { Curso } from './../../../../models/curso.model';
import { Organizacao } from './../../../../models/organizacao.model';
import { PessoaLogada } from './../../../../models/pessoa.model';
import { Indicador } from './../../../../models/indicador.model';
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { IndicadoresFacade } from '../indicadores-facade';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-indicadores-cadastro-container',
  templateUrl: './indicadores-cadastro-container.component.html',
  styleUrls: ['./indicadores-cadastro-container.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class IndicadoresCadastroContainerComponent implements OnInit {
  public indicadores: Indicador[];
  public indicadoresSelecionados: Indicador[];
  public indicador: Indicador = {};
  public cursoSelecionado: Curso;
  public cursos: SelectItem[];
  public orgSelecionada: Organizacao | undefined;
  public orgsSubordinadas: SelectItem[];
  public showDialogCreate = false;

  public pessoaLogada: PessoaLogada = {
    pessoa: {
      id: 15,
      nome: 'Fulano',
      organizacao: { id: 10, nome: 'Diretoria de Administração de Pessoal', sigla: 'DIRAP' }
    },
    roles: []
  };
  



  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private facade: IndicadoresFacade
  ) { }

  ngOnInit(): void {
    this.buscarIndicadores().subscribe(response => this.indicadores = response);
  }

  buscarIndicadores(): Observable<Indicador[]> {
    return this.facade.findAllIndicadores(this.pessoaLogada.pessoa.organizacao?.cdOrg);
  }

  openDialogCreateIndicador(): void {
    this.facade.findOrganizacoesSubordinadas(this.pessoaLogada.pessoa.organizacao?.cdOrg)
      .subscribe(response => {
        const itens = response.map(org => {
          const item: SelectItem = {
            label: org.sigla,
            title: org.nome,
            value: org
          };

          return item;
        });
        this.orgsSubordinadas = itens;
        this.orgSelecionada = this.pessoaLogada.pessoa.organizacao;
        this.showDialogCreate = true;
      });

    this.facade.findAllCapacitacao().subscribe(response =>
      this.cursos = response.map(curso => ({
        label: curso.sigla,
        title: curso.nome,
        value: curso
      }))
    );
  }

  edit(indicador: Indicador): void {
    this.indicador = { ...indicador };
    this.cursoSelecionado = {};
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

  }

  hideDialog(): void {
    this.resetForms();
    this.showDialogCreate = false;
  }

  saveIndicador(): void {
    console.log(this.cursoSelecionado)
    if (!this.cursoSelecionado) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'É necessário selecionar um curso o indicador', life: 3000 });
    }

    // if (this.indicador.idIndicador) {
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

}
