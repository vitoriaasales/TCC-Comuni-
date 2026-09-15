import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SobremimPage } from './sobremim.page';

const routes: Routes = [
  {
    path: '',
    component: SobremimPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SobremimPageRoutingModule {}
