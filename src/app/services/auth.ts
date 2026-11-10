
import { Injectable } from '@angular/core';
import {
  createClient,
  SupabaseClient,
  User
} from '@supabase/supabase-js';

import { environment } from '../../environments/environment';

export interface Ocorrencia {
  id: number;
  usuario_id: string;
  empresa: string;
  tipo: string;
  titulo: string;
  descricao: string;
  setor: string;
  criado_em: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  // CADASTRAR USUÁRIO
  async signUp(email: string, senha: string) {
    return await this.supabase.auth.signUp({
      email,
      password: senha
    });
  }

  // FAZER LOGIN
  async signIn(email: string, senha: string) {
    return await this.supabase.auth.signInWithPassword({
      email,
      password: senha
    });
  }

  // SAIR DA CONTA
  async signOut() {
    return await this.supabase.auth.signOut();
  }

  // BUSCAR USUÁRIO LOGADO
  async getCurrentUser(): Promise<User | null> {
    const { data, error } = await this.supabase.auth.getUser();

    if (error) {
      console.error('Erro ao buscar usuário:', error);
      return null;
    }

    return data.user;
  }

  // BUSCAR PERFIL
  async buscarPerfil() {
    const usuario = await this.getCurrentUser();

    if (!usuario) {
      throw new Error('Você precisa estar logado.');
    }

    const { data, error } = await this.supabase
      .from('perfis')
      .select('id, tipo_usuario, nome, sobrenome, idade, empresa, setor, condicao')
      .eq('id', usuario.id)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // IDENTIFICAR TIPO DE USUÁRIO
  async getTipoUsuario(): Promise<string> {
    const perfil = await this.buscarPerfil();

    return perfil?.tipo_usuario || 'funcionario';
  }

  // SALVAR DADOS DO PERFIL
  async salvarDadosPerfil(dados: {
    nome: string;
    sobrenome: string;
    idade: number;
    empresa: string;
    setor: string;
    condicao: string;
    codigoInstrutor?: string;
  }): Promise<void> {

    const usuario = await this.getCurrentUser();

    if (!usuario) {
      throw new Error('Sua sessão expirou. Faça login novamente.');
    }

    // VERIFICAR CÓDIGO DE INSTRUTOR
    if (dados.codigoInstrutor) {
      const { error: erroCodigo } = await this.supabase.rpc(
        'usar_codigo_instrutor',
        {
          p_codigo: dados.codigoInstrutor
        }
      );

      if (erroCodigo) {
        throw new Error(
          'Código de instrutor inválido ou já utilizado.'
        );
      }
    }

    // BUSCAR TIPO DE USUÁRIO
    const { data: perfilAtual, error: erroBusca } = await this.supabase
      .from('perfis')
      .select('tipo_usuario')
      .eq('id', usuario.id)
      .maybeSingle();

    if (erroBusca) {
      throw new Error(erroBusca.message);
    }

    // SALVAR INFORMAÇÕES
    const { error } = await this.supabase
      .from('perfis')
      .upsert({
        id: usuario.id,
        tipo_usuario: perfilAtual?.tipo_usuario || 'funcionario',
        nome: dados.nome,
        sobrenome: dados.sobrenome,
        idade: dados.idade,
        empresa: dados.empresa,
        setor: dados.setor,
        condicao: dados.condicao || null
      }, {
        onConflict: 'id'
      });

    if (error) {
      throw new Error(error.message);
    }
  }

  // REGISTRAR RELATÓRIO
  async registrarRelatorio(conteudo: string): Promise<void> {
    const usuario = await this.getCurrentUser();

    if (!usuario) {
      throw new Error('Você precisa estar logado para registrar.');
    }

    const { error } = await this.supabase
      .from('relatorios')
      .insert({
        conteudo: conteudo,
        usuario_id: usuario.id
      });

    if (error) {
      console.error('Erro ao salvar relatório:', error);
      throw new Error(error.message);
    }
  }

  // LISTAR RELATÓRIOS
  async listarRelatorios() {
    const { data, error } = await this.supabase
      .from('relatorios')
      .select('id, conteudo, criado_em, usuario_id')
      .order('criado_em', { ascending: false });

    if (error) {
      console.error('Erro ao buscar relatórios:', error);
      throw new Error(error.message);
    }

    return data ?? [];
  }

  // EDITAR RELATÓRIO
  async editarRelatorio(id: number, conteudo: string): Promise<void> {
    const { error } = await this.supabase
      .from('relatorios')
      .update({
        conteudo: conteudo
      })
      .eq('id', id);

    if (error) {
      console.error('Erro ao editar relatório:', error);
      throw new Error(error.message);
    }
  }

  // EXCLUIR RELATÓRIO
  async excluirRelatorio(id: number): Promise<void> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('ID do relatório inválido.');
    }

    const { data, error } = await this.supabase
      .from('relatorios')
      .delete()
      .eq('id', id)
      .select('id');

    if (error) {
      console.error('Erro ao excluir relatório:', error);
      throw new Error(error.message);
    }

    if (!data || data.length !== 1) {
      throw new Error(
        'Não foi possível confirmar a exclusão de um único relatório.'
      );
    }
  }

  // REGISTRAR OCORRÊNCIA - SOMENTE INSTRUTOR
  async registrarOcorrencia(dados: {
    tipo: string;
    titulo: string;
    descricao: string;
    setor: string;
  }): Promise<void> {

    const usuario = await this.getCurrentUser();

    if (!usuario) {
      throw new Error('Você precisa estar logado.');
    }

    const perfil = await this.buscarPerfil();

    if (perfil?.tipo_usuario !== 'instrutor') {
      throw new Error('Somente instrutores podem registrar ocorrências.');
    }

    if (!perfil.empresa) {
      throw new Error('O instrutor não possui uma empresa cadastrada.');
    }

    const { error } = await this.supabase
      .from('ocorrencias')
      .insert({
        usuario_id: usuario.id,
        empresa: perfil.empresa,
        tipo: dados.tipo,
        titulo: dados.titulo,
        descricao: dados.descricao,
        setor: dados.setor
      });

    if (error) {
      throw new Error(error.message);
    }
  }

  // LISTAR OCORRÊNCIAS DA EMPRESA
  async listarOcorrencias(): Promise<Ocorrencia[]> {

    const perfil = await this.buscarPerfil();

    if (!perfil?.empresa) {
      throw new Error('Não foi possível identificar sua empresa.');
    }

    const { data, error } = await this.supabase
      .from('ocorrencias')
      .select('*')
      .eq('empresa', perfil.empresa)
      .order('criado_em', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data || []) as Ocorrencia[];
  }

  // IA
  async enviarMensagemIA(mensagem: string): Promise<string> {

    const { data, error } = await this.supabase.functions.invoke(
      'chat-ia',
      {
        body: { mensagem }
      }
    );

    if (error) {
      console.error('Erro ao chamar a IA:', error);
      throw new Error('Não foi possível conectar à IA.');
    }

    if (!data || typeof data.resposta !== 'string') {
      throw new Error('A IA não retornou uma resposta válida.');
    }

    return data.resposta;
  }

}
