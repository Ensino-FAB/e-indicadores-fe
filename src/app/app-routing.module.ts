import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  // {
  //   path: '',
  //   children: [
  //     { path: '', redirectTo: 'indicadores', pathMatch: 'full' },
  //     {
  //       path: 'indicadores',
  //       loadChildren: () =>
  //         import('./modules/indicadores/indicadores.module')
  //         .then((m) => m.IndicadoresModule)
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
