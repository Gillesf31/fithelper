import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
  Signal,
} from '@angular/core';

import { AuthenticationService } from '@fithelper/fithelper-front/authentication/data-access';
import { Tables } from '@fithelper/fithelper-front/supabase/database/util';
import { User } from '@supabase/supabase-js';
import { filter, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { UserService } from '@fithelper/fithelper-front/user/data-access';
import { IntakeComponent } from '@fithelper/fithelper-front/homepage/intake/feature';
import { LoaderComponent } from '@fithelper/shared/ui-components/loader/ui';
import { TranslocoPipe } from '@jsverse/transloco';
import { UserFacade } from '@fithelper/fithelper-front/user/facade';

@Component({
  selector: 'fithelper-homepage-feature',
  imports: [LoaderComponent, IntakeComponent, TranslocoPipe],
  templateUrl: 'homepage-feature.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageFeatureComponent {
  public isLoading = signal(false);
  readonly #profileService = inject(UserService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #userFacade = inject(UserFacade);
  public readonly user: Signal<Tables<'users'> | undefined> = toSignal(
    inject(AuthenticationService).user$.pipe(
      tap(() => this.isLoading.set(true)),
      filter((user: User | null): user is User => !!user),
      switchMap((user: User) => {
        return this.#profileService.getUser(user);
      }),
      filter(
        (profile: Tables<'users'> | null): profile is Tables<'users'> =>
          !!profile,
      ),
      tap((profile: Tables<'users'>) => this.#userFacade.loadUser(profile)),
      tap(() => this.isLoading.set(false)),
      takeUntilDestroyed(this.#destroyRef),
    ),
  );
}
