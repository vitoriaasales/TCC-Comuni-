import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiscoPage } from './risco.page';

const routes: Routes = [
  {
    path: '',
    component: RiscoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiscoPageRoutingModule {}
