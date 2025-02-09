import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '@fithelper/fithelper-front/authentication/data-access';
import { AlertComponent } from '@fithelper/shared/ui-components/alert/ui';
import { LoaderComponent } from '@fithelper/shared/ui-components/loader/ui';
import { TranslocoModule } from '@jsverse/transloco';
import { AuthTokenResponse } from '@supabase/supabase-js';
import { tap } from 'rxjs';

@Component({
  selector: 'fithelper-front-login-feature',
  imports: [
    CommonModule,
    FormsModule,
    AlertComponent,
    RouterLink,
    LoaderComponent,
    TranslocoModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fithelper-front-login-feature.component.html',
})
export class FithelperFrontLoginFeatureComponent {
  protected isEmailSent = signal(false);
  protected userEmail: WritableSignal<string | undefined> = signal(undefined);
  protected userError: WritableSignal<string | undefined> = signal(undefined);
  protected isLoading = signal(false);
  protected showPassword = signal(false);
  protected passwordInputType = computed(() => {
    if (this.showPassword()) {
      return 'text';
    } else {
      return 'password';
    }
  });
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthenticationService);

  public login(email: string, password: string): void {
    this.isLoading.set(true);
    this.isEmailSent.set(false);
    this.userError.set(undefined);
    this.userEmail.set(email);
    this.#authService
      .signInWithPassword(email, password)
      .pipe(
        tap((value: AuthTokenResponse) => {
          if (!value.error) {
            this.isEmailSent.set(true);
          } else {
            this.isEmailSent.set(false);
            this.userError.set(value.error.message);
          }
        }),
        tap(() => {
          this.isLoading.set(false);
          this.#router.navigate(['/']);
        }),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe();
  }
}
