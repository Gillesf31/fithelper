import { inject, Injectable } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { Tables } from '@fithelper/fithelper-front/supabase/database/util';
import { SupabaseService } from '@fithelper/fithelper-front-supabase-data-access';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class ProfileService {
  readonly #supabase = inject(SupabaseService).supabaseClient;

  public getProfile(user: User): Observable<Tables<'profiles'> | null> {
    return from(
      this.#supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .returns<Tables<'profiles'>[]>()
        .single()
    ).pipe(map((response) => response.data));
  }

  public updateProfile(profile: Tables<'profiles'>) {
    return this.#supabase.from('profiles').upsert({
      ...profile,
      updated_at: new Date(),
    });
  }
}
