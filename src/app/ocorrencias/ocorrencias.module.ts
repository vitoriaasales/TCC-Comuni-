import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OcorrenciasPageRoutingModule } from './ocorrencias-routing.module';

import { OcorrenciasPage } from './ocorrencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OcorrenciasPageRoutingModule
  ],
  declarations: [OcorrenciasPage]
})
export class OcorrenciasPageModule {}
