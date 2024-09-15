import { inject, Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthResponse,
  AuthSession,
  AuthTokenResponse,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { BehaviorSubject, filter, from, Observable } from 'rxjs';
import { SupabaseService } from '@fithelper/fithelper-front-supabase-data-access';

@Injectable()
export class AuthenticationService {
  readonly #supabase: SupabaseClient = inject(SupabaseService).supabaseClient;
  #session: AuthSession | null = null;
  readonly #user$ = new BehaviorSubject<User | null | undefined>(undefined);
  public user$ = this.#user$
    .asObservable()
    .pipe(filter((value): value is User | null => value !== undefined));

  constructor() {
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
    callback: (event: AuthChangeEvent, session: Session | null) => void,
  ) {
    return this.#supabase.auth.onAuthStateChange(callback);
  }

  public signUp(email: string, password: string): Observable<AuthResponse> {
    return from(this.#supabase.auth.signUp({ email, password }));
  }

  public signInWithPassword(
    email: string,
    password: string,
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
      }),
    );
  }

  public signOut() {
    return from(this.#supabase.auth.signOut());
  }
}
