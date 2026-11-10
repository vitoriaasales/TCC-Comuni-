
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService, Ocorrencia } from '../services/auth';

@Component({
  selector: 'app-ocorrencias',
  templateUrl: './ocorrencias.page.html',
  styleUrls: ['./ocorrencias.page.scss'],
  standalone: false
})
export class OcorrenciasPage implements OnInit {

  ocorrencias: Ocorrencia[] = [];

  podeRegistrar = false;
  carregando = true;
  modalAberto = false;
  salvando = false;

  novaOcorrencia = {
    tipo: 'Acidente',
    titulo: '',
    descricao: '',
    setor: ''
  };

  constructor(
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.carregarOcorrencias();
  }

  async carregarOcorrencias() {
    this.carregando = true;

    try {
      const perfil = await this.authService.buscarPerfil();

      this.podeRegistrar =
        perfil?.tipo_usuario === 'instrutor';

      this.ocorrencias =
        await this.authService.listarOcorrencias();

    } catch (erro: any) {
      await this.mostrarMensagem(
        erro.message || 'Erro ao carregar ocorrências.'
      );
    } finally {
      this.carregando = false;
    }
  }

  abrirModal() {
    if (!this.podeRegistrar) {
      return;
    }

    this.novaOcorrencia = {
      tipo: 'Acidente',
      titulo: '',
      descricao: '',
      setor: ''
    };

    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  async salvarOcorrencia() {
    if (
      !this.novaOcorrencia.titulo.trim() ||
      !this.novaOcorrencia.descricao.trim() ||
      !this.novaOcorrencia.setor.trim()
    ) {
      await this.mostrarMensagem('Preencha todos os campos.');
      return;
    }

    this.salvando = true;

    try {
      await this.authService.registrarOcorrencia(
        this.novaOcorrencia
      );

      this.modalAberto = false;

      await this.mostrarMensagem(
        'Ocorrência registrada com sucesso!'
      );

      await this.carregarOcorrencias();

    } catch (erro: any) {
      await this.mostrarMensagem(
        erro.message || 'Não foi possível registrar.'
      );
    } finally {
      this.salvando = false;
    }
  }

  async mostrarMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2500,
      position: 'bottom',
      color: 'dark'
    });

    await toast.present();
  }

  
formatarData(data: string): string {
  return new Date(data).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}


}
