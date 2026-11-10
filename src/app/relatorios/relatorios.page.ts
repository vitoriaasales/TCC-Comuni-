
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth';

interface Relatorio {
  id: number;
  conteudo: string;
  criado_em: string;
  usuario_id: string;
}

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.page.html',
  styleUrls: ['./relatorios.page.scss'],
  standalone: false,
})
export class RelatoriosPage {

  ehInstrutor: boolean = false;
  carregandoPermissao: boolean = true;

  relatorios: Relatorio[] = [];
  carregandoRelatorios: boolean = false;
  erroCarregamento: string = '';

  constructor(
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  // Atualiza a página sempre que ela é aberta
  async ionViewWillEnter(): Promise<void> {
    await this.verificarPermissao();
    await this.carregarRelatorios();
  }

  // VERIFICAR SE É INSTRUTOR
  async verificarPermissao(): Promise<void> {
    this.carregandoPermissao = true;

    try {
      const tipoUsuario = await this.authService.getTipoUsuario();
      this.ehInstrutor = tipoUsuario === 'instrutor';

    } catch (erro) {
      console.error('Erro ao verificar usuário:', erro);
      this.ehInstrutor = false;

    } finally {
      this.carregandoPermissao = false;
    }
  }

  // CARREGAR RELATÓRIOS
  async carregarRelatorios(): Promise<void> {
    this.carregandoRelatorios = true;
    this.erroCarregamento = '';

    try {
      this.relatorios = await this.authService.listarRelatorios();

    } catch (erro) {
      console.error('Erro ao carregar relatórios:', erro);
      this.erroCarregamento =
        'Não foi possível carregar os relatórios. Tente novamente.';

    } finally {
      this.carregandoRelatorios = false;
    }
  }

  // FORMATAR DATA
  formatarData(data: string): string {
    return new Date(data).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // EDITAR RELATÓRIO
  async editarRelatorio(relatorio: Relatorio): Promise<void> {

    if (!this.ehInstrutor) return;

    const alerta = await this.alertController.create({
      header: 'Editar relatório',
      message: 'Altere a descrição do relatório abaixo.',
      inputs: [
        {
          name: 'conteudo',
          type: 'textarea',
          value: relatorio.conteudo,
          placeholder: 'Digite a descrição do relatório...'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salvar alterações',
          role: 'confirm'
        }
      ]
    });

    await alerta.present();

    const resultado = await alerta.onDidDismiss();

    if (resultado.role !== 'confirm') return;

    const novoConteudo = resultado.data?.values?.conteudo?.trim();

    if (!novoConteudo) {
      const aviso = await this.alertController.create({
        header: 'Atenção',
        message: 'A descrição do relatório não pode ficar vazia.',
        buttons: ['OK']
      });

      await aviso.present();
      return;
    }

    try {
      await this.authService.editarRelatorio(
        relatorio.id,
        novoConteudo
      );

      const sucesso = await this.alertController.create({
        header: 'Relatório atualizado!',
        message: 'As alterações foram salvas com sucesso.',
        buttons: ['OK']
      });

      await sucesso.present();

      await this.carregarRelatorios();

    } catch (erro: any) {
      console.error('Erro ao editar:', erro);

      const aviso = await this.alertController.create({
        header: 'Erro',
        message: erro.message || 'Não foi possível editar o relatório.',
        buttons: ['OK']
      });

      await aviso.present();
    }
  }

  // EXCLUIR RELATÓRIO
  async excluirRelatorio(relatorio: Relatorio): Promise<void> {

    if (!this.ehInstrutor) return;

    const confirmacao = await this.alertController.create({
      header: 'Excluir relatório',
      message: 'Tem certeza de que deseja excluir este relatório? Essa ação não poderá ser desfeita.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          role: 'confirm'
        }
      ]
    });

    await confirmacao.present();

    const resultado = await confirmacao.onDidDismiss();

    if (resultado.role !== 'confirm') return;

    try {
      await this.authService.excluirRelatorio(relatorio.id);

      const sucesso = await this.alertController.create({
        header: 'Relatório excluído!',
        message: 'O relatório foi removido com sucesso.',
        buttons: ['OK']
      });

      await sucesso.present();

      await this.carregarRelatorios();

    } catch (erro: any) {
      console.error('Erro ao excluir:', erro);

      const aviso = await this.alertController.create({
        header: 'Erro',
        message: erro.message || 'Não foi possível excluir o relatório.',
        buttons: ['OK']
      });

      await aviso.present();
    }
  }

}
