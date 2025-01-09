import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '@fithelper/fithelper-front/authentication/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { AuthOtpResponse } from '@supabase/supabase-js';
import { RouterLink } from '@angular/router';
import { AlertComponent } from '@fithelper/shared/ui-components/alert/ui';
import { LoaderComponent } from '@fithelper/shared/ui-components/loader/ui';

@Component({
  selector: 'fithelper-front-login-feature',
  imports: [
    CommonModule,
    FormsModule,
    AlertComponent,
    RouterLink,
    LoaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fithelper-front-login-feature.component.html',
})
export class FithelperFrontLoginFeatureComponent {
  public isEmailSent = signal(false);
  public userEmail: WritableSignal<string | undefined> = signal(undefined);
  public userError: WritableSignal<string | undefined> = signal(undefined);
  public isLoading = signal(false);
  readonly #destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthenticationService);

  public login(email: string): void {
    this.isLoading.set(true);
    this.isEmailSent.set(false);
    this.userError.set(undefined);
    this.userEmail.set(email);
    this.#authService
      .signInWithMagicLink(email)
      .pipe(
        tap((value: AuthOtpResponse) => {
          if (!value.error) {
            this.isEmailSent.set(true);
          } else {
            this.isEmailSent.set(false);
            this.userError.set(value.error.message);
          }
        }),
        tap(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe();
  }
}
