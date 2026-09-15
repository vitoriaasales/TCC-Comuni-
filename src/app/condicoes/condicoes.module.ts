import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CondicoesPageRoutingModule } from './condicoes-routing.module';

import { CondicoesPage } from './condicoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CondicoesPageRoutingModule
  ],
  declarations: [CondicoesPage]
})
export class CondicoesPageModule {}
