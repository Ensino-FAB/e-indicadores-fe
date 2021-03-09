import { IndicadoresConsultaContainerComponent } from './containers/indicadores-consulta-container/indicadores-consulta-container.component';
import { IndicadoresCadastroContainerComponent } from './containers/indicadores-cadastro-container/indicadores-cadastro-container.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthGuard } from 'src/auth/public-api';

export const INDICADORES_ROUTES: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: IndicadoresConsultaContainerComponent,
    },
    {
        path: 'cadastro',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: IndicadoresCadastroContainerComponent
    },
    {
        path: '**',
        children: [],
        resolve: {
          url: 'externalUrlRedirectResolver',
        },
        data: {
          externalUrl: `${environment.INDICADORES_FRONT_URL}`,
        },
      }
];

@NgModule({
    declarations: [],
    imports: [CommonModule],
})
export class IndicadoresRoutingModule { }
