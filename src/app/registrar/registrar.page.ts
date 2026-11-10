
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
  standalone: false
})
export class RegistrarPage {

  relatorioTexto: string = '';
  salvando: boolean = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  async registrarRelatorio() {

    if (!this.relatorioTexto.trim()) {

      const alert = await this.alertController.create({
        header: 'Atenção',
        message: 'Digite o relatório antes de registrar.',
        buttons: ['OK']
      });

      await alert.present();
      return;
    }

    if (this.salvando) return;

    this.salvando = true;

    try {

      await this.authService.registrarRelatorio(
        this.relatorioTexto.trim()
      );

      const alert = await this.alertController.create({
        header: 'Relatório registrado!',
        message: 'Seu relatório foi salvo com sucesso.',
        buttons: ['OK']
      });

      await alert.present();
      await alert.onDidDismiss();

      this.relatorioTexto = '';

      await this.router.navigateByUrl('/relatorios');

    } catch (erro: any) {

      console.error('Erro ao registrar:', erro);

      const alert = await this.alertController.create({
        header: 'Erro',
        message: erro.message || 'Não foi possível registrar o relatório.',
        buttons: ['OK']
      });

      await alert.present();

    } finally {

      this.salvando = false;

    }
  }
}
