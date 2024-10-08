import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '@fithelper/fithelper-front/authentication/data-access';
import { AlertComponent } from '@fithelper/shared/ui-components/alert/ui';
import { LoaderComponent } from '@fithelper/shared/ui-components/loader/ui';

@Component({
  selector: 'fithelper-front-homepage-register-feature',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    FormsModule,
    RouterLink,
    LoaderComponent,
  ],
  templateUrl: './fithelper-front-register-feature.component.html',
})
export class FithelperFrontRegisterFeatureComponent {
  public isAccountCreated: boolean | undefined = undefined;
  public isAccountAlreadyExists: boolean | undefined = undefined;
  public showPassword = false;
  public passwordInputType = 'password';
  public isLoading = false;
  public readonly pwdRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,72}$/;
  readonly #authService = inject(AuthenticationService);

  public register(email: string, password: string) {
    this.isLoading = true;
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
      this.isLoading = false;
    });
  }

  public toggleShowPassword(showPassword: boolean): void {
    this.showPassword = showPassword;
    this.showPassword
      ? (this.passwordInputType = 'text')
      : (this.passwordInputType = 'password');
  }
}
