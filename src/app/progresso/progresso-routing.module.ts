import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgressoPage } from './progresso.page';

const routes: Routes = [
  {
    path: '',
    component: ProgressoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgressoPageRoutingModule {}
