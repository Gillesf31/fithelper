import { Route } from '@angular/router';
import { FithelperShellComponent } from './shell.component';
import {
  authenticatedUser,
  AuthenticationService,
  notAuthenticatedUser,
} from '@fithelper/fithelper-front/authentication/data-access';

export const ROUTES: Route[] = [
  {
    path: '',
    component: FithelperShellComponent,
    providers: [AuthenticationService],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@fithelper/fithelper-front/homepage/feature').then(
            (c) => c.HomepageFeatureComponent
          ),
        canActivate: [notAuthenticatedUser()],
      },
      {
        path: 'login',
        loadComponent: () =>
          import('@fithelper/fithelper-front-login-feature').then(
            (c) => c.FithelperFrontLoginFeatureComponent
          ),
        canActivate: [authenticatedUser()],
      },
      {
        path: 'register',
        loadComponent: () =>
          import('@fithelper/fithelper-front/register/feature').then(
            (c) => c.FithelperFrontRegisterFeatureComponent
          ),
        canActivate: [authenticatedUser()],
      },
    ],
  },
];
