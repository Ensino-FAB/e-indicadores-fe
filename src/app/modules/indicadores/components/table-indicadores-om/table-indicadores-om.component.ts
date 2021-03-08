import { Indicador } from 'src/app/models/indicador.model';
import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DiplomadosListComponent } from '../diplomados-list/diplomados-list.component';

@Component({
  selector: 'app-table-indicadores-om',
  templateUrl: './table-indicadores-om.component.html',
  styleUrls: ['./table-indicadores-om.component.scss'],
  providers: [DialogService]
})
export class TableIndicadoresOmComponent implements OnInit {

  @Input() indicadores: Indicador[];


  constructor(private dialogService: DialogService) {
  }

  ngOnInit(): void {
  }

  buscaDiplomados(indicador: Indicador): void {
    const ref = this.dialogService.open(DiplomadosListComponent, {
      data: {
        idOrg: indicador.organizacao.cdOrg,
        capacitacaoId: indicador.capacitacao.id
      },
      header: `Diplomados do ${indicador.capacitacao.nome}`,
      width: '70vw',
      height: '70vh'
    });
  }

}
