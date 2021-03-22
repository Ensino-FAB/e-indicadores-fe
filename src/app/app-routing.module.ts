import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthGuard } from '../../src/auth/public-api';
import { NotAllowedComponent } from './shared/components/not-allowed/not-allowed.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'indicadores',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./modules/indicadores/indicadores.module')
        .then((m) => m.IndicadoresModule)
  },
  { path: '403', component: NotAllowedComponent },
  {
    path: '**', redirectTo: '/404',
    resolve: {
      url: 'externalUrlRedirectResolver',
    },
    data: {
      externalUrl: `${environment.INDICADORES_FRONT_URL}`,
    },
  },
  { path: '404', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
