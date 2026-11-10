
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController
} from '@ionic/angular';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: false,
})
export class CadastroPage {

  cadastroForm: FormGroup;
  cadastrando = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.cadastroForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      senha: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }

  async cadastrar(): Promise<void> {
    if (this.cadastroForm.invalid || this.cadastrando) {
      this.cadastroForm.markAllAsTouched();
      return;
    }

    this.cadastrando = true;

    const loading = await this.loadingController.create({
      message: 'Criando sua conta...'
    });

    await loading.present();

    try {
      const { email, senha } = this.cadastroForm.value;

      const resultado = await this.authService.signUp(email, senha);

      if (resultado.error) {
        throw resultado.error;
      }

      await loading.dismiss();

      if (resultado.data.session) {
        await this.router.navigateByUrl('/dados', {
          replaceUrl: true
        });
      } else {
        const alerta = await this.alertController.create({
          header: 'Confirme seu e-mail',
          message:
            'Sua conta foi criada! Confirme seu endereço de e-mail e depois faça login para completar seus dados.',
          buttons: [{
            text: 'Ir para login',
            handler: () => {
              this.router.navigateByUrl('/login');
            }
          }]
        });

        await alerta.present();
      }

    } catch (error: any) {
      await loading.dismiss();

      const alerta = await this.alertController.create({
        header: 'Erro no cadastro',
        message: error.message || 'Não foi possível criar sua conta.',
        buttons: ['OK']
      });

      await alerta.present();

    } finally {
      this.cadastrando = false;
    }
  }
}
