import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import { from } from 'rxjs';

@Injectable()
export class AuthenticationService {
  #supabase: SupabaseClient;
  #session: AuthSession | null = null;

  constructor() {
    const supabaseUrl = 'https://cfxhxempgckdyyldndno.supabase.co';
    const supabaseKey =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmeGh4ZW1wZ2NrZHl5bGRuZG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIzODQyNDAsImV4cCI6MTk5Nzk2MDI0MH0.RPRoWrAsNC-VKng2l-AnsyvOaSw2oWsBoCp7cKb9bKA';
    this.#supabase = createClient(supabaseUrl, supabaseKey);
  }

  public get session() {
    this.#supabase.auth.getSession().then(({ data }) => {
      this.#session = data.session;
      return this.#session;
    });
    return this.#session;
  }

  public authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.#supabase.auth.onAuthStateChange(callback);
  }

  public signUp(email: string, password: string) {
    return from(this.#supabase.auth.signUp({ email, password }));
  }

  public signInWithPassword(email: string, password: string) {
    return from(this.#supabase.auth.signInWithPassword({ email, password }));
  }

  public signInWithMagicLink(email: string, createUser = false) {
    return from(
      this.#supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: createUser,
        },
      })
    );
  }

  public signOut() {
    return from(this.#supabase.auth.signOut());
  }
}
