import { ToastModule } from 'primeng/toast';
import { IndicadoresFacade } from './containers/indicadores-facade';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicadoresCadastroContainerComponent } from './containers/indicadores-cadastro-container/indicadores-cadastro-container.component';
import { IndicadoresConsultaContainerComponent } from './containers/indicadores-consulta-container/indicadores-consulta-container.component';
import { INDICADORES_ROUTES } from './indicadores-routing.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { TableIndicadoresCursoComponent } from './components/table-indicadores-curso/table-indicadores-curso.component';
import { TableIndicadoresOmComponent } from './components/table-indicadores-om/table-indicadores-om.component';
import { DiplomadosListComponent } from './components/diplomados-list/diplomados-list.component';


@NgModule({
  declarations: [IndicadoresCadastroContainerComponent, IndicadoresConsultaContainerComponent, TableIndicadoresCursoComponent, TableIndicadoresOmComponent, DiplomadosListComponent],
  imports: [
    CommonModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextareaModule,
    TableModule,
    OverlayPanelModule,
    DropdownModule,
    InputNumberModule,
    ToolbarModule,
    FormsModule,
    ToastModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    RouterModule.forChild(INDICADORES_ROUTES)
  ],
  providers: [IndicadoresFacade]
})
export class IndicadoresModule { }
