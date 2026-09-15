import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SobremimPageRoutingModule } from './sobremim-routing.module';

import { SobremimPage } from './sobremim.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SobremimPageRoutingModule
  ],
  declarations: [SobremimPage]
})
export class SobremimPageModule {}
