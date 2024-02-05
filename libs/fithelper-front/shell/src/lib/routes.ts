import { Route } from '@angular/router';
import { FithelperShellComponent } from './shell.component';
import {
  authenticatedUser,
  AuthenticationService,
  notAuthenticatedUser,
} from '@fithelper/fithelper-front/authentication/data-access';
import { SupabaseService } from '@fithelper/fithelper-front-supabase-data-access';
import { importProvidersFrom } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import {
  UserFacade,
  UserService,
  UserState,
} from '@fithelper/fithelper-front/user/data-access';

export const ROUTES: Route[] = [
  {
    path: '',
    component: FithelperShellComponent,
    providers: [
      SupabaseService,
      AuthenticationService,
      UserService,
      UserFacade,
      importProvidersFrom(NgxsModule.forFeature([UserState])),
    ],
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
