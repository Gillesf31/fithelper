import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '@fithelper/fithelper-front/authentication/data-access';
import { AlertComponent } from '@fithelper/shared/ui-components/alert/ui';
import { LoaderComponent } from '@fithelper/shared/ui-components/loader/ui';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'fithelper-front-homepage-register-feature',
  imports: [
    AlertComponent,
    FormsModule,
    RouterLink,
    LoaderComponent,
    TranslocoPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fithelper-front-register-feature.component.html',
})
export class FithelperFrontRegisterFeatureComponent {
  protected readonly pwdRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,72}$/;
  protected doesAccountExist: WritableSignal<boolean | undefined> =
    signal(undefined);
  protected showPassword: WritableSignal<boolean> = signal(false);

  protected passwordInputType = computed(() => {
    if (this.showPassword()) {
      return 'text';
    } else {
      return 'password';
    }
  });

  protected isLoading = signal(false);
  protected isAccountCreated: WritableSignal<boolean | undefined> =
    signal(undefined);
  readonly #authService = inject(AuthenticationService);

  protected register(email: string, password: string) {
    this.isLoading.set(true);
    this.#authService.signUp(email, password).subscribe((res) => {
      if (!res.error) {
        if (res.data.user?.identities?.length === 0) {
          this.isAccountCreated.set(false);
          this.doesAccountExist.set(true);
        } else {
          this.isAccountCreated.set(true);
        }
      } else {
        this.isAccountCreated.set(false);
      }
      this.isLoading.set(false);
    });
  }
}
