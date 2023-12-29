import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthResponse,
  AuthSession,
  AuthTokenResponse,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { BehaviorSubject, filter, from, Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
  #supabase: SupabaseClient;
  #session: AuthSession | null = null;
  #user$ = new BehaviorSubject<User | null | undefined>(undefined);
  public user$ = this.#user$
    .asObservable()
    .pipe(filter((value): value is User | null => value !== undefined));

  constructor() {
    const supabaseUrl = 'https://cfxhxempgckdyyldndno.supabase.co';
    const supabaseKey =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmeGh4ZW1wZ2NrZHl5bGRuZG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIzODQyNDAsImV4cCI6MTk5Nzk2MDI0MH0.RPRoWrAsNC-VKng2l-AnsyvOaSw2oWsBoCp7cKb9bKA';
    this.#supabase = createClient(supabaseUrl, supabaseKey);

    this.#supabase.auth.onAuthStateChange((_, session) => {
      this.#session = session;
      this.#user$.next(session?.user ?? null);
    });
  }

  public get session(): AuthSession | null {
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

  public signUp(email: string, password: string): Observable<AuthResponse> {
    return from(this.#supabase.auth.signUp({ email, password }));
  }

  public signInWithPassword(
    email: string,
    password: string
  ): Observable<AuthTokenResponse> {
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
