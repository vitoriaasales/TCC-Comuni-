import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IAPageRoutingModule } from './ia-routing.module';

import { IAPage } from './ia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IAPageRoutingModule
  ],
  declarations: [IAPage]
})
export class IAPageModule {}
