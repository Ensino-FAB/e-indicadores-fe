import { IndicadoresFacade } from './../../containers/indicadores-facade';
import { Diplomado } from '../../../../models/diplomado.model';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-diplomados-list',
  templateUrl: './diplomados-list.component.html',
  styleUrls: ['./diplomados-list.component.scss']
})
export class DiplomadosListComponent implements OnInit {

  public diplomados: Diplomado[];


  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private facade: IndicadoresFacade
  ) { }

  ngOnInit(): void {
    this.buscaDiplomados();
  }

  buscaDiplomados(): void {
    this.facade.findAllDiplomados(this.config.data.idOrg, this.config.data.capacitacaoId)
      .subscribe(response => {
        this.diplomados = [...response];
      });

  }

}
