import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  SelectThemeType,
  ThemeTogglerComponent,
} from '@fithelper/shared/theme-toggler/ui';
import {
  handleAppTheme,
  toggleTheme,
} from '@fithelper/fithelper-front/homepage/util';
import { AuthenticationService } from '@fithelper/fithelper-front/authentication/data-access';
import { RouterOutlet } from '@angular/router';
import { IntakeService } from '@fithelper/fithelper-front/homepage/intake/data-access';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'fithelper-shell',
  imports: [RouterOutlet, ThemeTogglerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthenticationService, IntakeService],
  template: `
    <div class="absolute right-0 top-0">
      <fithelper-theme-toggler
        (selectTheme)="toggleTheme($event)"
        [label]="labelThemeToggler"
        [selectItems]="selectItems"
      />
    </div>
    <router-outlet></router-outlet>
  `,
})
export class FithelperShellComponent implements OnInit {
  public readonly labelThemeToggler =
    inject(TranslocoService).translate('theme');
  public readonly selectItems: readonly SelectThemeType[] = [
    { label: 'Dark', value: 'night' },
    { label: 'Light', value: 'nord' },
    { label: 'Sydowh', value: 'synthwave' },
    { label: 'Croucx', value: 'sunset' },
  ];

  public ngOnInit(): void {
    handleAppTheme(this.selectItems[1].value, this.selectItems[0].value);
  }

  public toggleTheme(theme: string): void {
    toggleTheme(theme);
  }
}
