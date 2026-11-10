
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.page.html',
  styleUrls: ['./alerta.page.scss'],
  standalone: false,
})
export class AlertaPage {

  constructor(
    private alertController: AlertController
  ) { }

  // VIBRAR AO ENTRAR NA PÁGINA
  async ionViewDidEnter() {
    try {
      await Haptics.impact({
        style: ImpactStyle.Light
      });
    } catch (error) {
      console.log('Vibração indisponível neste dispositivo.');
    }
  }

  // ABRIR DETALHES DE CADA ALERTA
  async abrirDetalhes(tipo: string) {

    let titulo = '';
    let mensagem = '';

    switch (tipo) {

      case 'incendio':

        titulo = 'Alerta: Incêndio';

        mensagem = `
O QUE É?

Uma situação em que o fogo se espalha de forma descontrolada em um ambiente.

SINAIS DE ALERTA:

• Presença de fumaça.
• Chamas ou focos de fogo.
• Cheiro de queimado.
• Alarmes ou avisos de incêndio.

O QUE FAZER?

• Mantenha a calma e avise as pessoas próximas.
• Siga a rota de evacuação indicada pela empresa.
• Dirija-se ao ponto de encontro.
• Não utilize elevadores.
• Avise os responsáveis pela segurança.

IMPORTANTE:

Não tente combater o incêndio se não tiver treinamento.
Priorize a evacuação e siga o plano de emergência.
        `;

        break;

      case 'eletrico':

        titulo = 'Alerta: Choque elétrico';

        mensagem = `
O QUE É?

Uma situação de perigo causada pelo contato com eletricidade.

SINAIS DE ALERTA:

• Fios desencapados ou expostos.
• Tomadas danificadas.
• Faíscas em equipamentos.
• Cabos ou instalações danificadas.

O QUE FAZER?

• Não toque em fios ou equipamentos danificados.
• Afaste-se da área de risco.
• Avise imediatamente o responsável pela segurança.
• Não toque em uma pessoa que possa estar em contato com uma fonte elétrica.
• Aguarde a equipe responsável e o atendimento de emergência.

IMPORTANTE:

Somente profissionais capacitados devem intervir na instalação elétrica.
        `;

        break;

      case 'quimico':

        titulo = 'Alerta: Vazamento químico';

        mensagem = `
O QUE É?

Uma liberação acidental de produtos químicos no ambiente de trabalho.

SINAIS DE ALERTA:

• Líquidos derramados próximos a recipientes.
• Embalagens danificadas.
• Avisos ou alarmes de substâncias perigosas.
• Presença de vapores ou odores incomuns.

O QUE FAZER?

• Afaste-se da área e evite contato com a substância.
• Não tente limpar o vazamento.
• Avise o responsável pela segurança.
• Siga as orientações de evacuação.
• Aguarde a equipe treinada para atender a ocorrência.

IMPORTANTE:

Não toque, não cheire de perto e não tente identificar o produto por conta própria.
        `;

        break;

      default:
        return;
    }

    const alerta = await this.alertController.create({

      header: titulo,

      message: mensagem,

      buttons: [
        {
          text: 'Entendi',
          role: 'confirm'
        }
      ],

      cssClass: 'alerta-detalhes'

    });

    await alerta.present();

  }

}
