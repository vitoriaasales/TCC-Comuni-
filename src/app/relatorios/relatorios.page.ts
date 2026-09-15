import { Component } from '@angular/core';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.page.html',
  styleUrls: ['./relatorios.page.scss'],
  standalone:false,
})
export class RelatoriosPage {

  usuarioLogado: any;

  constructor() {

    // Exemplo de usuário logado
    this.usuarioLogado = {
      nome: 'João',
      tipo: 'gerente'
    };

  }

}