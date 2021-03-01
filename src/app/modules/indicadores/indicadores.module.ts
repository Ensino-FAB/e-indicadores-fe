import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicadoresCadastroContainerComponent } from './containers/indicadores-cadastro-container/indicadores-cadastro-container.component';
import { IndicadoresConsultaContainerComponent } from './containers/indicadores-consulta-container/indicadores-consulta-container.component';
import { INDICADORES_ROUTES } from './indicadores-routing.module';

@NgModule({
  declarations: [IndicadoresCadastroContainerComponent, IndicadoresConsultaContainerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(INDICADORES_ROUTES)
  ]
})
export class IndicadoresModule { }
