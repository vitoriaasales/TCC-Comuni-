
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  // SPLASH SCREEN
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },

  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroPageModule)
  },

  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioPageModule)
  },

  {
    path: 'risco',
    loadChildren: () => import('./risco/risco.module').then(m => m.RiscoPageModule)
  },

  {
    path: 'alerta',
    loadChildren: () => import('./alerta/alerta.module').then(m => m.AlertaPageModule)
  },

  {
    path: 'seguranca',
    loadChildren: () => import('./seguranca/seguranca.module').then(m => m.SegurancaPageModule)
  },

  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule)
  },

  {
    path: 'ia',
    loadChildren: () => import('./ia/ia.module').then(m => m.IAPageModule)
  },

  {
    path: 'pessoa',
    loadChildren: () => import('./pessoa/pessoa.module').then(m => m.PessoaPageModule)
  },

  {
    path: 'ocorrencias',
    loadChildren: () => import('./ocorrencias/ocorrencias.module').then(m => m.OcorrenciasPageModule)
  },

  {
    path: 'relatorios',
    loadChildren: () => import('./relatorios/relatorios.module').then(m => m.RelatoriosPageModule)
  },

  {
    path: 'sobremim',
    loadChildren: () => import('./sobremim/sobremim.module').then(m => m.SobremimPageModule)
  },

  {
    path: 'registrar',
    loadChildren: () => import('./registrar/registrar.module').then(m => m.RegistrarPageModule)
  },

  {
    path: 'redefinir',
    loadChildren: () => import('./redefinir/redefinir.module').then(m => m.RedefinirPageModule)
  },

  {
    path: 'dados',
    loadChildren: () => import('./dados/dados.module').then(m => m.DadosPageModule)
  },

  {
    path: 'condicoes',
    loadChildren: () => import('./condicoes/condicoes.module').then(m => m.CondicoesPageModule)
  },

  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'progresso',
    loadChildren: () => import('./progresso/progresso.module').then( m => m.ProgressoPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
