import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OcorrenciasPage } from './ocorrencias.page';

const routes: Routes = [
  {
    path: '',
    component: OcorrenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OcorrenciasPageRoutingModule {}
