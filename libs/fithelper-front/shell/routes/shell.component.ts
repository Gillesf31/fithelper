import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '@fithelper/fithelper-front/authentication/data-access';
import { IntakeService } from '@fithelper/fithelper-front/homepage/intake/data-access';
import {
  handleAppTheme,
  toggleTheme,
} from '@fithelper/fithelper-front/homepage/util';
import { UserFacade } from '@fithelper/fithelper-front/user/facade';
import { SelectThemeType } from '@fithelper/shared/theme-toggler/ui';
import { TranslocoPipe } from '@jsverse/transloco';
import { take, tap } from 'rxjs';

@Component({
  selector: 'fithelper-shell',
  imports: [RouterOutlet, TranslocoPipe, UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthenticationService, IntakeService],
  template: `
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-md shadow-primary/15"
          >
            @for (theme of selectTheme; track theme.value) {
              <li>
                <a (click)="toggleTheme(theme.value)">{{ theme.label }}</a>
              </li>
            }
          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <a class="btn btn-ghost text-xl">Fithelper</a>
      </div>
      <div class="navbar-end">
        @if (user(); as user) {
          <div class="dropdown dropdown-end">
            <div
              tabindex="0"
              role="button"
              class="btn btn-ghost btn-circle avatar"
            >
              <div class="w-10 rounded-full">
                <span
                  class="bg-neutral flex justify-center h-full items-center text-xl"
                >
                  @if (user.username) {
                    {{ user.username.substring(0, 2) | uppercase }}
                  } @else {
                    FH
                  }
                </span>
              </div>
            </div>
            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-md shadow-primary/15"
            >
              <li>
                <a (click)="logout()">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M8.00171 7C8.01382 4.82497 8.11027 3.64706 8.87865 2.87868C9.75733 2 11.1715 2 14 2H15C17.8284 2 19.2426 2 20.1213 2.87868C21 3.75736 21 5.17157 21 8V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H14C11.1715 22 9.75733 22 8.87865 21.1213C8.11027 20.3529 8.01382 19.175 8.00171 17"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      opacity="0.5"
                      d="M8 19.5C5.64298 19.5 4.46447 19.5 3.73223 18.7678C3 18.0355 3 16.857 3 14.5V9.5C3 7.14298 3 5.96447 3.73223 5.23223C4.46447 4.5 5.64298 4.5 8 4.5"
                      stroke="currentColor"
                      stroke-width="1.5"
                    />
                    <path
                      d="M15 12L6 12M6 12L8 14M6 12L8 10"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {{ 'signOut' | transloco }}
                </a>
              </li>
            </ul>
          </div>
        }
      </div>
    </div>
    <router-outlet></router-outlet>
    <footer class="footer footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>Copyright © 2025</p>
      </aside>
    </footer>
  `,
})
export class FithelperShellComponent implements OnInit {
  protected readonly selectTheme: readonly SelectThemeType[] = [
    { label: 'Dark', value: 'sunset' },
    { label: 'Light', value: 'nord' },
    { label: 'Night', value: 'night' },
    { label: 'Sunset', value: 'synthwave' },
  ];
  readonly #userFacade = inject(UserFacade);
  protected user = this.#userFacade.selectUser;
  readonly #supabaseClient = inject(AuthenticationService);
  readonly #router = inject(Router);

  public ngOnInit(): void {
    handleAppTheme(this.selectTheme[1].value, this.selectTheme[0].value);
  }

  public toggleTheme(theme: string): void {
    toggleTheme(theme);
  }

  protected logout(): void {
    this.#supabaseClient
      .signOut()
      .pipe(
        take(1),
        tap(() => this.#router.navigate(['/login'])),
      )
      .subscribe(() => {
        this.#userFacade.logout();
      });
  }
}
