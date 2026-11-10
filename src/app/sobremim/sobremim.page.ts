
import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth';

interface Perfil {
  nome: string;
  sobrenome: string;
  idade: number;
  empresa: string;
  setor: string;
  condicao: string | null;
}

@Component({
  selector: 'app-sobremim',
  templateUrl: './sobremim.page.html',
  styleUrls: ['./sobremim.page.scss'],
  standalone: false,
})
export class SobremimPage {

  perfil: Perfil | null = null;
  carregando = true;

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async ionViewWillEnter(): Promise<void> {
    await this.carregarPerfil();
  }

  async carregarPerfil(): Promise<void> {
    this.carregando = true;

    try {
      this.perfil = await this.authService.buscarPerfil();

    } catch (error) {
      console.error('Erro ao carregar perfil:', error);

      const alerta = await this.alertController.create({
        header: 'Erro',
        message: 'Não foi possível carregar seus dados.',
        buttons: ['OK']
      });

      await alerta.present();

    } finally {
      this.carregando = false;
    }
  }

  async editarPerfil(): Promise<void> {

    if (!this.perfil) return;

    const alerta = await this.alertController.create({
      header: 'Editar meu perfil',
      message: 'Atualize suas informações.',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Nome',
          value: this.perfil.nome
        },
        {
          name: 'sobrenome',
          type: 'text',
          placeholder: 'Sobrenome',
          value: this.perfil.sobrenome
        },
        {
          name: 'idade',
          type: 'number',
          placeholder: 'Idade',
          value: this.perfil.idade
        },
        {
          name: 'empresa',
          type: 'text',
          placeholder: 'Empresa',
          value: this.perfil.empresa
        },
        {
          name: 'setor',
          type: 'text',
          placeholder: 'Setor',
          value: this.perfil.setor
        },
        {
          name: 'condicao',
          type: 'textarea',
          placeholder: 'Condição (opcional)',
          value: this.perfil.condicao || ''
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salvar',
          role: 'confirm'
        }
      ]
    });

    await alerta.present();

    const resultado = await alerta.onDidDismiss();

    if (resultado.role !== 'confirm') return;

    const dados = resultado.data?.values;

    if (
      !dados ||
      !dados.nome?.trim() ||
      !dados.sobrenome?.trim() ||
      !dados.idade ||
      !dados.empresa?.trim() ||
      !dados.setor?.trim()
    ) {
      const aviso = await this.alertController.create({
        header: 'Atenção',
        message: 'Preencha todos os campos obrigatórios.',
        buttons: ['OK']
      });

      await aviso.present();
      return;
    }

    const idade = Number(dados.idade);

    if (!Number.isInteger(idade) || idade < 1 || idade > 120) {
      const aviso = await this.alertController.create({
        header: 'Idade inválida',
        message: 'Informe uma idade válida.',
        buttons: ['OK']
      });

      await aviso.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Atualizando perfil...'
    });

    await loading.present();

    try {
      await this.authService.salvarDadosPerfil({
        nome: dados.nome.trim(),
        sobrenome: dados.sobrenome.trim(),
        idade,
        empresa: dados.empresa.trim(),
        setor: dados.setor.trim(),
        condicao: dados.condicao?.trim() || ''
      });

      await loading.dismiss();

      await this.carregarPerfil();

      const sucesso = await this.alertController.create({
        header: 'Perfil atualizado!',
        message: 'Suas informações foram atualizadas.',
        buttons: ['OK']
      });

      await sucesso.present();

    } catch (error: any) {
      await loading.dismiss();

      const aviso = await this.alertController.create({
        header: 'Erro',
        message: error.message || 'Não foi possível atualizar seu perfil.',
        buttons: ['OK']
      });

      await aviso.present();
    }
  }
}
