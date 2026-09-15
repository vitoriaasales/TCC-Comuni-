import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RedefinirPageRoutingModule } from './redefinir-routing.module';

import { RedefinirPage } from './redefinir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RedefinirPageRoutingModule
  ],
  declarations: [RedefinirPage]
})
export class RedefinirPageModule {}
