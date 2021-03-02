import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicadoresCadastroContainerComponent } from './containers/indicadores-cadastro-container/indicadores-cadastro-container.component';
import { IndicadoresConsultaContainerComponent } from './containers/indicadores-consulta-container/indicadores-consulta-container.component';
import { INDICADORES_ROUTES } from './indicadores-routing.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [IndicadoresCadastroContainerComponent, IndicadoresConsultaContainerComponent],
  imports: [
    CommonModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextareaModule,
    TableModule,
    OverlayPanelModule,
    DropdownModule,
    InputNumberModule,
    ToolbarModule,
    FormsModule,
    RouterModule.forChild(INDICADORES_ROUTES)
  ]
})
export class IndicadoresModule { }
