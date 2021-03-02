import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'indicadores',
    loadChildren: () =>
      import('./modules/indicadores/indicadores.module')
        .then((m) => m.IndicadoresModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
