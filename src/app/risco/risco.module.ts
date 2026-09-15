import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiscoPageRoutingModule } from './risco-routing.module';

import { RiscoPage } from './risco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiscoPageRoutingModule
  ],
  declarations: [RiscoPage]
})
export class RiscoPageModule {}
