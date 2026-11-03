import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth';

interface Mensagem {
  texto: string;
  autor: 'usuario' | 'ia';
}

@Component({
  selector: 'app-ia',
  templateUrl: './ia.page.html',
  styleUrls: ['./ia.page.scss'],
  standalone: false,
})
export class IAPage implements OnInit {

  textoMensagem = '';
  mensagens: Mensagem[] = [];
  carregando = false;
  erro = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  async enviarMensagem() {

    const texto = this.textoMensagem.trim();

    if (!texto || this.carregando) {
      return;
    }

    // Adiciona a mensagem do usuário
    this.mensagens.push({
      texto: texto,
      autor: 'usuario'
    });

    this.textoMensagem = '';
    this.carregando = true;
    this.erro = '';

    try {

      // Envia a mensagem para o Gemini pelo Supabase
      const resposta = await this.authService.enviarMensagemIA(texto);

      // Adiciona a resposta da IA
      this.mensagens.push({
        texto: resposta,
        autor: 'ia'
      });

    } catch (error) {

      console.error('Erro na conversa com a IA:', error);

      this.erro = 'Não foi possível obter uma resposta. Tente novamente.';

    } finally {

      this.carregando = false;

    }
  }
}
