
import { Component } from '@angular/core';

interface ItemSeguranca {
  nome: string;
  concluido: boolean;
}

@Component({
  selector: 'app-progresso',
  templateUrl: './progresso.page.html',
  styleUrls: ['./progresso.page.scss'],
  standalone: false,
})
export class ProgressoPage {

  private chaveProgresso = 'comuni_progresso_seguranca';

  itens: ItemSeguranca[] = [];

  constructor() {}

  ionViewWillEnter() {
    this.carregarProgresso();
  }

  carregarProgresso() {
    const dados = localStorage.getItem(this.chaveProgresso);

    const padrao: ItemSeguranca[] = [
      { nome: 'Capacete', concluido: false },
      { nome: 'Luvas', concluido: false },
      { nome: 'Óculos', concluido: false },
      { nome: 'Colete', concluido: false },
      { nome: 'Protetor Facial', concluido: false },
      { nome: 'Máscara', concluido: false },
      { nome: 'Botas', concluido: false }
    ];

    if (dados) {
      try {
        const salvos: ItemSeguranca[] = JSON.parse(dados);

        this.itens = padrao.map(item => {
          const encontrado = salvos.find(
            salvo => salvo.nome === item.nome
          );

          return {
            ...item,
            concluido: encontrado?.concluido ?? false
          };
        });

        return;
      } catch {
        console.error('Não foi possível carregar o progresso.');
      }
    }

    this.itens = padrao;
  }

  get quantidadeConcluida(): number {
    return this.itens.filter(item => item.concluido).length;
  }

  get percentual(): number {
    if (this.itens.length === 0) {
      return 0;
    }

    return Math.round(
      (this.quantidadeConcluida / this.itens.length) * 100
    );
  }

}
