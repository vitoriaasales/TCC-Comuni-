import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CondicoesPage } from './condicoes.page';

const routes: Routes = [
  {
    path: '',
    component: CondicoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CondicoesPageRoutingModule {}
