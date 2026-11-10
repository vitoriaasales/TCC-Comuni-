
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RedefinirPageRoutingModule } from './redefinir-routing.module';
import { RedefinirPage } from './redefinir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RedefinirPageRoutingModule
  ],
  declarations: [RedefinirPage]
})
export class RedefinirPageModule {}
