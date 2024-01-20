import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '@fithelper/fithelper-front-supabase-data-access';
import { AuthenticationService } from '@fithelper/fithelper-front/authentication/data-access';
import { ProfileService } from '@fithelper/data-access';
import { Tables } from '@fithelper/fithelper-front/supabase/database/util';
import { User } from '@supabase/supabase-js';
import { filter, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'fithelper-homepage-feature',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="btn btn-primary" (click)="signOut()">Sign out</button>
  `,
})
export class HomepageFeatureComponent implements OnInit {
  readonly #supabaseClient = inject(SupabaseService).supabaseClient;
  readonly #user$ = inject(AuthenticationService).user$;
  readonly #profileService = inject(ProfileService);
  readonly #destroyRef = inject(DestroyRef);

  #user!: User;
  #userProfile!: Tables<'profiles'>;

  public ngOnInit(): void {
    this.#user$
      .pipe(
        filter((user: User | null): user is User => !!user),
        tap((user: User) => (this.#user = user)),
        switchMap((user: User) => {
          return this.#profileService.getProfile(user);
        }),
        filter(
          (profile: Tables<'profiles'> | null): profile is Tables<'profiles'> =>
            !!profile
        ),
        tap((profile: Tables<'profiles'>) => (this.#userProfile = profile)),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }

  public signOut() {
    this.#supabaseClient.auth.signOut();
  }
}
