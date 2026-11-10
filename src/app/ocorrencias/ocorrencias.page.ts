
import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
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
  editando = false;

  ocorrenciaEditandoId: number | null = null;

  novaOcorrencia = {
    tipo: 'Acidente',
    titulo: '',
    descricao: '',
    setor: ''
  };

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private alertController: AlertController
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

    this.editando = false;
    this.ocorrenciaEditandoId = null;

    this.novaOcorrencia = {
      tipo: 'Acidente',
      titulo: '',
      descricao: '',
      setor: ''
    };

    this.modalAberto = true;
  }

  editarOcorrencia(ocorrencia: Ocorrencia) {
    if (!this.podeRegistrar) {
      return;
    }

    this.editando = true;
    this.ocorrenciaEditandoId = ocorrencia.id;

    this.novaOcorrencia = {
      tipo: ocorrencia.tipo,
      titulo: ocorrencia.titulo,
      descricao: ocorrencia.descricao,
      setor: ocorrencia.setor
    };

    this.modalAberto = true;
  }

  fecharModal() {
    if (this.salvando) {
      return;
    }

    this.modalAberto = false;
    this.editando = false;
    this.ocorrenciaEditandoId = null;
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
      if (this.editando && this.ocorrenciaEditandoId !== null) {

        await this.authService.editarOcorrencia(
          this.ocorrenciaEditandoId,
          this.novaOcorrencia
        );

        await this.mostrarMensagem(
          'Ocorrência atualizada com sucesso!'
        );

      } else {

        await this.authService.registrarOcorrencia(
          this.novaOcorrencia
        );

        await this.mostrarMensagem(
          'Ocorrência registrada com sucesso!'
        );
      }

      this.modalAberto = false;
      this.editando = false;
      this.ocorrenciaEditandoId = null;

      await this.carregarOcorrencias();

    } catch (erro: any) {
      await this.mostrarMensagem(
        erro.message || 'Não foi possível salvar.'
      );
    } finally {
      this.salvando = false;
    }
  }

  async confirmarExclusao(ocorrencia: Ocorrencia) {
    if (!this.podeRegistrar) {
      return;
    }

    const alerta = await this.alertController.create({
      header: 'Excluir ocorrência?',
      message: `Deseja realmente excluir "${ocorrencia.titulo}"? Essa ação não poderá ser desfeita.`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.excluirOcorrencia(ocorrencia.id);
          }
        }
      ]
    });

    await alerta.present();
  }

  async excluirOcorrencia(id: number) {
    try {
      await this.authService.excluirOcorrencia(id);

      await this.mostrarMensagem(
        'Ocorrência excluída com sucesso!'
      );

      await this.carregarOcorrencias();

    } catch (erro: any) {
      await this.mostrarMensagem(
        erro.message || 'Não foi possível excluir.'
      );
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
