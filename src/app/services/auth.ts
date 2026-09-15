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
}

