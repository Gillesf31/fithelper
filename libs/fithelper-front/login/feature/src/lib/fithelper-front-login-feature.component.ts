import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '@fithelper/fithelper-front/authentication/data-access';
import { AlertComponent } from '@fithelper/fithelper-front-shared-ui-components-alert-ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { AuthOtpResponse } from '@supabase/supabase-js';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'fithelper-front-login-feature',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertComponent, RouterLink],
  templateUrl: './fithelper-front-login-feature.component.html',
})
export class FithelperFrontLoginFeatureComponent {
  public isEmailSent: boolean = false;
  public userEmail: string | undefined = undefined;
  public userError: string | undefined = undefined;
  readonly #destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthenticationService);

  public login(email: string): void {
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
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }
}
