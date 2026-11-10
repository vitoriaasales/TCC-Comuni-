
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-redefinir',
  templateUrl: './redefinir.page.html',
  styleUrls: ['./redefinir.page.scss'],
  standalone: false
})
export class RedefinirPage implements OnInit {

  carregando = false;
  sessaoRecuperacao = false;

  emailForm: FormGroup;
  senhaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.senhaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]]
    });
  }

  async ngOnInit() {
    const emailSalvo = sessionStorage.getItem('emailRecuperacao');

    const possuiSessao =
      await this.authService.verificarSessaoRecuperacao();

    if (possuiSessao) {
      this.sessaoRecuperacao = true;

      if (emailSalvo) {
        this.senhaForm.patchValue({ email: emailSalvo });
      }
    }
  }

  async solicitarRecuperacao() {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    const email = String(
      this.emailForm.value.email
    ).trim().toLowerCase();

    this.carregando = true;

    try {
      sessionStorage.setItem('emailRecuperacao', email);

      await this.authService.solicitarRecuperacaoSenha(email);

      await this.mostrarAlerta(
        'Se existir uma conta com esse e-mail, você receberá um link para autorizar a redefinição da senha.'
      );

    } catch (erro: any) {
      await this.mostrarAlerta(
        erro.message || 'Não foi possível enviar o e-mail.'
      );
    } finally {
      this.carregando = false;
    }
  }

  async redefinirSenha() {
    if (this.senhaForm.invalid) {
      this.senhaForm.markAllAsTouched();
      return;
    }

    const emailDigitado = String(
      this.senhaForm.value.email
    ).trim().toLowerCase();

    const novaSenha = this.senhaForm.value.novaSenha;
    const confirmarSenha = this.senhaForm.value.confirmarSenha;

    if (novaSenha !== confirmarSenha) {
      await this.mostrarAlerta('As senhas não coincidem.');
      return;
    }

    this.carregando = true;

    try {
      const emailAutorizado =
        await this.authService.obterEmailUsuario();

      if (emailDigitado !== emailAutorizado.toLowerCase()) {
        await this.mostrarAlerta(
          'O e-mail digitado não corresponde à conta autorizada pelo link.'
        );
        return;
      }

      await this.authService.atualizarSenhaRecuperacao(novaSenha);

      sessionStorage.removeItem('emailRecuperacao');

      await this.mostrarAlerta(
        'Senha alterada com sucesso! Faça login com sua nova senha.'
      );

      await this.router.navigateByUrl('/login');

    } catch (erro: any) {
      await this.mostrarAlerta(
        erro.message || 'Não foi possível alterar a senha.'
      );
    } finally {
      this.carregando = false;
    }
  }

  async mostrarAlerta(mensagem: string) {
    const alerta = await this.alertController.create({
      header: 'Comuni+',
      message: mensagem,
      buttons: ['OK']
    });

    await alerta.present();
  }
}
