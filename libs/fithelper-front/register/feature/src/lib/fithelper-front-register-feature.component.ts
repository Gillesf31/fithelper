import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '@fithelper/fithelper-front-shared-ui-components-alert-ui';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '@fithelper/fithelper-front/authentication/data-access';

@Component({
  selector: 'fithelper-front-homepage-register-feature',
  standalone: true,
  imports: [CommonModule, AlertComponent, FormsModule, RouterLink],
  templateUrl: './fithelper-front-register-feature.component.html',
})
export class FithelperFrontRegisterFeatureComponent {
  public isAccountCreated: boolean | undefined = undefined;
  public isAccountAlreadyExists: boolean | undefined = undefined;
  readonly #authService = inject(AuthenticationService);

  public register(email: string, password: string) {
    this.#authService.signUp(email, password).subscribe((res) => {
      if (!res.error) {
        if (res.data.user?.identities?.length === 0) {
          this.isAccountCreated = false;
          this.isAccountAlreadyExists = true;
        } else {
          this.isAccountCreated = true;
        }
      } else {
        this.isAccountCreated = false;
      }
    });
  }
}