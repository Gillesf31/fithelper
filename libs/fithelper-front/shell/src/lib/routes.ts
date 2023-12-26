import { Routes } from '@angular/router';
import { AuthenticationService } from '@fithelper/fithelper-front/authentication/data-access';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'homepage/login', pathMatch: 'full' },
  { path: 'homepage', redirectTo: 'homepage/login', pathMatch: 'full' },
  {
    providers: [AuthenticationService],
    path: 'homepage',
    loadComponent: () =>
      import('@fithelper/fithelper-front/homepage/feature').then(
        (c) => c.HomepageFeatureComponent
      ),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('@fithelper/fithelper-front-login-feature').then(
            (c) => c.FithelperFrontLoginFeatureComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('@fithelper/fithelper-front/register/feature').then(
            (c) => c.FithelperFrontRegisterFeatureComponent
          ),
      },
    ],
  },
];
