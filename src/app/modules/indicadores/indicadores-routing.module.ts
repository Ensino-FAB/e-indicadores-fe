import { IndicadoresConsultaContainerComponent } from './containers/indicadores-consulta-container/indicadores-consulta-container.component';
import { IndicadoresCadastroContainerComponent } from './containers/indicadores-cadastro-container/indicadores-cadastro-container.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

export const INDICADORES_ROUTES: Routes = [
    {
        path: 'indicadores',
        component: IndicadoresConsultaContainerComponent,
    },
];

@NgModule({
    declarations: [],
    imports: [CommonModule],
})
export class IndicadoresRoutingModule { }
