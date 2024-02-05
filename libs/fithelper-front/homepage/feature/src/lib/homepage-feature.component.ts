import { Component, DestroyRef, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '@fithelper/fithelper-front-supabase-data-access';
import { AuthenticationService } from '@fithelper/fithelper-front/authentication/data-access';
import { Tables } from '@fithelper/fithelper-front/supabase/database/util';
import { User } from '@supabase/supabase-js';
import { filter, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { LoaderComponent } from '@fithelper/fithelper-front-shared-ui-components-loader-ui';
import {
  UserFacade,
  UserService,
} from '@fithelper/fithelper-front/user/data-access';

@Component({
  selector: 'fithelper-homepage-feature',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  template: `
    @if (isLoading) {
    <fithelper-loader></fithelper-loader>
    } @else if (user()?.username) {
    <h1>Welcome {{ user()?.username }}</h1>
    <button class="btn btn-primary" (click)="signOut()">Sign out</button>
    }
  `,
})
export class HomepageFeatureComponent {
  public isLoading: boolean = false;
  readonly #supabaseClient = inject(SupabaseService).supabaseClient;
  readonly #profileService = inject(UserService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #userFacade = inject(UserFacade);
  public readonly user: Signal<Tables<'users'> | undefined> = toSignal(
    inject(AuthenticationService).user$.pipe(
      tap(() => (this.isLoading = true)),
      filter((user: User | null): user is User => !!user),
      switchMap((user: User) => {
        return this.#profileService.getUser(user);
      }),
      filter(
        (profile: Tables<'users'> | null): profile is Tables<'users'> =>
          !!profile
      ),
      tap((profile: Tables<'users'>) => this.#userFacade.loadUser(profile)),
      tap(() => (this.isLoading = false)),
      takeUntilDestroyed(this.#destroyRef)
    )
  );

  public signOut(): void {
    this.#supabaseClient.auth.signOut();
  }
}
