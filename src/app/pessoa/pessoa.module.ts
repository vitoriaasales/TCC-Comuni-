import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PessoaPageRoutingModule } from './pessoa-routing.module';

import { PessoaPage } from './pessoa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PessoaPageRoutingModule
  ],
  declarations: [PessoaPage]
})
export class PessoaPageModule {}
