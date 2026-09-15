import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IAPage } from './ia.page';

const routes: Routes = [
  {
    path: '',
    component: IAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IAPageRoutingModule {}
