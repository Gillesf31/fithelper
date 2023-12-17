import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SelectThemeType,
  ThemeTogglerComponent,
} from '@fithelper/shared/theme-toggler/ui';
import {
  handleAppTheme,
  toggleTheme,
} from '@fithelper/fithelper-front/homepage/util';
import { AuthenticationService } from '@fithelper/fithelper-front/authentication/data-access';
import { FithelperFrontLoginFeatureComponent } from '@fithelper/fithelper-front-login-feature';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'fithelper-homepage-feature',
  standalone: true,
  imports: [
    CommonModule,
    ThemeTogglerComponent,
    FithelperFrontLoginFeatureComponent,
  ],
  template: `
    <div class="absolute right-0">
      <fithelper-theme-toggler
        (selectTheme)="toggleTheme($event)"
        [label]="labelThemeToggler"
        [selectItems]="selectItems"
      />
    </div>
    @if (session) {
    <p>Logged in, user home page here</p>
    <button class="btn btn-primary" (click)="signOut()">Sign out</button>
    } @else {
    <fithelper-front-login-feature />
    }
  `,
})
export class HomepageFeatureComponent implements OnInit {
  public readonly labelThemeToggler = 'Theme';
  public readonly selectItems: readonly SelectThemeType[] = [
    { label: 'Dark', value: 'night' },
    { label: 'Light', value: 'nord' },
    { label: 'Sydowh', value: 'synthwave' },
    { label: 'Croucx', value: 'sunset' },
  ];
  readonly #authenticationService = inject(AuthenticationService);
  public session = this.#authenticationService.session;
  readonly #destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    handleAppTheme(this.selectItems[0].value, this.selectItems[1].value);
    this.#authenticationService.authChanges((_, session) => {
      this.session = session;
      if (this.session) {
        console.log(this.session);
      } else {
        console.log('no session');
      }
    });
  }

  public toggleTheme(theme: string): void {
    toggleTheme(theme);
  }

  public signOut() {
    this.#authenticationService
      .signOut()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe();
  }
}
