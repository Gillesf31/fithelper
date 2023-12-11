import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectThemeType, ThemeTogglerComponent } from '@fithelper/shared/theme-toggler/ui';
import { handleAppTheme, toggleTheme } from '@fithelper/fithelper-front/homepage/util';


@Component({
  selector: 'fithelper-homepage-feature',
  standalone: true,
  imports: [CommonModule, ThemeTogglerComponent],
  template: `
      <p>Welcome to fithelper-homepage-feature works!</p>
      <fithelper-theme-toggler (selectTheme)="toggleTheme($event)" [label]="labelThemeToggler" [selectItems]="selectItems" />
  `,
})
export class HomepageFeatureComponent implements OnInit {
  public readonly labelThemeToggler = 'Theme';
  public readonly selectItems: readonly SelectThemeType[] = [
    { label: 'Dark', value: 'night' },
    { label: 'Light', value: 'nord' },
    { label: 'Sydowh', value: 'synthwave' },
    { label: 'Croucx', value: 'sunset' },
  ]

  public ngOnInit(): void {
    handleAppTheme(this.selectItems[0].value, this.selectItems[1].value);
  }

  public toggleTheme(theme: string): void {
    toggleTheme(theme)
  }
}
