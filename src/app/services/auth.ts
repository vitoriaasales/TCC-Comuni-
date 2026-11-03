
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

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

  async signUp(email: string, senha: string) {
    return await this.supabase.auth.signUp({
      email: email,
      password: senha
    });
  }

  async signIn(email: string, senha: string) {
    return await this.supabase.auth.signInWithPassword({
      email: email,
      password: senha
    });
  }

  async signOut() {
    return await this.supabase.auth.signOut();
  }

  async getCurrentUser(): Promise<User | null> {
    const { data } = await this.supabase.auth.getUser();

    return data.user;
  }

  // Enviar mensagem para a Inteligência Artificial
  async enviarMensagemIA(mensagem: string): Promise<string> {

    const { data, error } = await this.supabase.functions.invoke(
      'chat-ia',
      {
        body: {
          mensagem: mensagem
        }
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
