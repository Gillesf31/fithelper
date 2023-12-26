import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectThemeType } from './models/select-theme.model';

@Component({
  standalone: true,
  selector: 'fithelper-theme-toggler',
  template: `
    <div class="dropdown mb-72">
      <div tabindex="0" role="button" class="btn m-1">
        {{ label }}
        <svg
          width="12px"
          height="12px"
          class="h-2 w-2 fill-current opacity-60 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path
            d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"
          ></path>
        </svg>
      </div>
      <ul
        tabindex="0"
        class="right-0 dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52"
      >
        @for (item of selectItems;track item.value) {
        <li (click)="onSelect(item.value)">
          <input
            data-choose-theme
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            attr.aria-label="{{ item.label }}"
            value="{{ item.value }}"
          />
        </li>
        }
      </ul>
    </div>
  `,
})
export class ThemeTogglerComponent {
  @Input({ required: true }) public label = 'Default label';
  @Input({ required: true }) public selectItems:
    | readonly SelectThemeType[]
    | undefined;

  @Output() public selectTheme = new EventEmitter<string>();

  public onSelect(themeValue: string) {
    this.selectTheme.emit(themeValue);
  }
}
