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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {

    this.cadastroForm = this.fb.group({

      nome: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],

      cpf: ['', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ]],

      telefone: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11)
      ]],

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

  async cadastrar() {

    if (this.cadastroForm.invalid) {

      this.cadastroForm.markAllAsTouched();

      return;
    }

    const { email, senha } = this.cadastroForm.value;

    const loading = await this.loadingController.create({
      message: 'Cadastrando...'
    });

    await loading.present();

    try {

      const resultado = await this.authService.signUp(
        email,
        senha
      );

      // VERIFICA SE O SUPABASE DEVOLVEU ERRO
      if (resultado.error) {
        throw resultado.error;
      }

      await loading.dismiss();

      const alert = await this.alertController.create({
        header: 'Cadastro realizado!',
        message: 'Cadastro realizado com sucesso. Agora faça login.',
        buttons: ['OK']
      });

      await alert.present();

      this.router.navigateByUrl('/login');

    } catch (error: any) {

      await loading.dismiss();

      const alert = await this.alertController.create({
        header: 'Erro no cadastro',
        message: error.message || 'Não foi possível concluir o cadastro.',
        buttons: ['OK']
      });

      await alert.present();

    }

  }

}