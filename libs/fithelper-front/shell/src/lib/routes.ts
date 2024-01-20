import { Route } from '@angular/router';
import { FithelperShellComponent } from './shell.component';
import {
  authenticatedUser,
  AuthenticationService,
  notAuthenticatedUser,
} from '@fithelper/fithelper-front/authentication/data-access';
import { SupabaseService } from '@fithelper/fithelper-front-supabase-data-access';
import { ProfileService } from '@fithelper/data-access';

export const ROUTES: Route[] = [
  {
    path: '',
    component: FithelperShellComponent,
    providers: [SupabaseService, AuthenticationService, ProfileService],
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
