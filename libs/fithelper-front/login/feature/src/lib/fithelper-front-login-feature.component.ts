import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '@fithelper/fithelper-front/authentication/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { AlertComponent } from '@fithelper/fithelper-front-shared-ui-components-alert-ui';

@Component({
  selector: 'fithelper-front-login-feature',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertComponent],
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
        takeUntilDestroyed(this.#destroyRef),
        tap((value) => {
          if (!value.error) {
            this.isEmailSent = true;
          } else {
            this.isEmailSent = false;
            this.userError = value.error.message;
          }
        })
      )
      .subscribe();
  }
}
