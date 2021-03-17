import { Diplomado } from '../../../../models/diplomado.model';
import { Indicador } from './../../../../models/indicador.model';
import { Component, Input } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DiplomadosListComponent } from '../diplomados-list/diplomados-list.component';

@Component({
  selector: 'app-table-indicadores-curso',
  templateUrl: './table-indicadores-curso.component.html',
  styleUrls: ['./table-indicadores-curso.component.scss'],
  providers: [DialogService]
})
export class TableIndicadoresCursoComponent {

  @Input() indicadores: Indicador[];
  public diplomados: Diplomado;

  constructor(private dialogService: DialogService) { }

  buscaDiplomados(indicador: Indicador): void {
    const ref = this.dialogService.open(DiplomadosListComponent, {
      data: {
        idOrg: indicador.organizacao.id,
        idCurso: indicador.capacitacao.id,
      },
      header: `Diplomados do ${indicador.capacitacao.nome}`,
      width: '70vw',
      height: 'auto'
    });
  }

  get nomeCurso(): string{
    if (this.indicadores){
      return this.indicadores[0].capacitacao.codigo + ' - ' + this.indicadores[0].capacitacao.nome;
     }

    return '';
  }
}
