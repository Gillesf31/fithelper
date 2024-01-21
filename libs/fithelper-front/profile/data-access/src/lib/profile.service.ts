import { inject, Injectable } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { Tables } from '@fithelper/fithelper-front/supabase/database/util';
import { SupabaseService } from '@fithelper/fithelper-front-supabase-data-access';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class ProfileService {
  readonly #supabase = inject(SupabaseService).supabaseClient;

  public getProfile(user: User): Observable<Tables<'users'> | null> {
    return from(
      this.#supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .returns<Tables<'users'>[]>()
        .single()
    ).pipe(map((response) => response.data));
  }

  public updateProfile(profile: Tables<'users'>) {
    return this.#supabase.from('users').upsert({
      ...profile,
      updated_at: new Date(),
    });
  }
}
