import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {

    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],

      senha: ['', [
        Validators.required
      ]]
    });
  }

  async entrar() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.loginForm.value.email;
    const senha = this.loginForm.value.senha;

    const loading = await this.loadingController.create({
      message: 'Entrando...'
    });

    await loading.present();

    try {

      const resultado = await this.authService.signIn(
        email,
        senha
      );

      console.log('RESULTADO DO LOGIN:', resultado);

      if (resultado.error) {
        throw resultado.error;
      }

      await loading.dismiss();

      // Depois do login, vai para a página inicial
      await this.router.navigateByUrl('/inicio', {
        replaceUrl: true
      });

    } catch (error: any) {

      await loading.dismiss();

      console.error('ERRO NO LOGIN:', error);

      const alert = await this.alertController.create({
        header: 'Erro no login',
        message: error.message || 'E-mail ou senha inválidos.',
        buttons: ['OK']
      });

      await alert.present();
    }
  }
}