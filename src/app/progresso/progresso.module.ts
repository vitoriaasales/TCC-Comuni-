import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgressoPageRoutingModule } from './progresso-routing.module';

import { ProgressoPage } from './progresso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgressoPageRoutingModule
  ],
  declarations: [ProgressoPage]
})
export class ProgressoPageModule {}
