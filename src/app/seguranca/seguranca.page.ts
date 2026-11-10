
import { Component, OnInit } from '@angular/core';

interface ItemSeguranca {
  nome: string;
  concluido: boolean;
}

@Component({
  selector: 'app-seguranca',
  templateUrl: './seguranca.page.html',
  styleUrls: ['./seguranca.page.scss'],
  standalone: false,
})
export class SegurancaPage implements OnInit {

  private chaveProgresso = 'comuni_progresso_seguranca';

  itens: ItemSeguranca[] = [
    { nome: 'Capacete', concluido: false },
    { nome: 'Luvas', concluido: false },
    { nome: 'Óculos', concluido: false },
    { nome: 'Colete', concluido: false },
    { nome: 'Protetor Facial', concluido: false },
    { nome: 'Máscara', concluido: false },
    { nome: 'Botas', concluido: false }
  ];

  constructor() {}

  ngOnInit() {
    this.carregarProgresso();
  }

  get quantidadeConcluida(): number {
    return this.itens.filter(item => item.concluido).length;
  }

  get percentual(): number {
    return Math.round(
      (this.quantidadeConcluida / this.itens.length) * 100
    );
  }

  carregarProgresso() {
    const dados = localStorage.getItem(this.chaveProgresso);

    if (dados) {
      try {
        const salvos: ItemSeguranca[] = JSON.parse(dados);

        this.itens.forEach(item => {
          const encontrado = salvos.find(
            salvo => salvo.nome === item.nome
          );

          item.concluido = encontrado?.concluido ?? false;
        });
      } catch {
        console.error('Não foi possível carregar o progresso.');
      }
    }
  }

  atualizarItem(item: ItemSeguranca, concluido: boolean) {
    item.concluido = concluido;

    localStorage.setItem(
      this.chaveProgresso,
      JSON.stringify(this.itens)
    );
  }

}
