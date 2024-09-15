import { Component, DestroyRef, inject } from '@angular/core';
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
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AlertComponent,
    RouterLink,
    LoaderComponent,
  ],
  templateUrl: './fithelper-front-login-feature.component.html',
})
export class FithelperFrontLoginFeatureComponent {
  public isEmailSent = false;
  public userEmail: string | undefined = undefined;
  public userError: string | undefined = undefined;
  public isLoading = false;
  readonly #destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthenticationService);

  public login(email: string): void {
    this.isLoading = true;
    this.isEmailSent = false;
    this.userError = undefined;
    this.userEmail = email;
    this.#authService
      .signInWithMagicLink(email)
      .pipe(
        tap((value: AuthOtpResponse) => {
          if (!value.error) {
            this.isEmailSent = true;
          } else {
            this.isEmailSent = false;
            this.userError = value.error.message;
          }
        }),
        tap(() => (this.isLoading = false)),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe();
  }
}
