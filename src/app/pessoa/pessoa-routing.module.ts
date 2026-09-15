import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoaPage } from './pessoa.page';

const routes: Routes = [
  {
    path: '',
    component: PessoaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PessoaPageRoutingModule {}
