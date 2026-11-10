
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
  selector: 'app-dados',
  templateUrl: './dados.page.html',
  styleUrls: ['./dados.page.scss'],
  standalone: false,
})
export class DadosPage {

  dadosForm: FormGroup;
  salvando = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {

    this.dadosForm = this.fb.group({

      nome: ['', Validators.required],

      sobrenome: ['', Validators.required],

      idade: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(120)
      ]],

      empresa: ['', Validators.required],

      setor: ['', Validators.required],

      codigoInstrutor: [''],

      condicao: [''],

      aceitouTermos: [false, Validators.requiredTrue]

    });

  }

  async finalizarCadastro(): Promise<void> {

    if (this.dadosForm.invalid || this.salvando) {

      this.dadosForm.markAllAsTouched();

      const alerta = await this.alertController.create({
        header: 'Confira seus dados',
        message: 'Preencha os campos obrigatórios e aceite os termos de uso.',
        buttons: ['OK']
      });

      await alerta.present();

      return;
    }

    this.salvando = true;

    const loading = await this.loadingController.create({
      message: 'Salvando seus dados...'
    });

    await loading.present();

    try {

      const dados = this.dadosForm.value;

      await this.authService.salvarDadosPerfil({

        nome: dados.nome.trim(),

        sobrenome: dados.sobrenome.trim(),

        idade: Number(dados.idade),

        empresa: dados.empresa.trim(),

        setor: dados.setor.trim(),

        condicao: dados.condicao?.trim() || '',

        codigoInstrutor: dados.codigoInstrutor?.trim() || ''

      });

      await loading.dismiss();

      const alerta = await this.alertController.create({
        header: 'Cadastro concluído!',
        message: 'Seus dados foram salvos com sucesso.',
        buttons: [{
          text: 'Continuar',
          handler: () => {
            this.router.navigateByUrl('/inicio', {
              replaceUrl: true
            });
          }
        }]
      });

      await alerta.present();

    } catch (error: any) {

      await loading.dismiss();

      const alerta = await this.alertController.create({
        header: 'Erro ao salvar',
        message: error.message || 'Não foi possível salvar seus dados.',
        buttons: ['OK']
      });

      await alerta.present();

    } finally {

      this.salvando = false;

    }

  }

}
