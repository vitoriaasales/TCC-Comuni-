import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
  standalone: false
})
export class RegistrarPage {

  relatorioTexto: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
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


    const alert = await this.alertController.create({
      header: 'Relatório registrado!',
      message: 'O relatório foi registrado com sucesso.',
      buttons: ['OK']
    });

    await alert.present();

    this.router.navigateByUrl('/relatorios');

  }

}