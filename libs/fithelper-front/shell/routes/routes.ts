import { Route } from '@angular/router';
import { FithelperShellComponent } from './shell.component';
import {
  authenticatedUser,
  AuthenticationService,
  notAuthenticatedUser,
} from '@fithelper/fithelper-front/authentication/data-access';
import { SupabaseService } from '@fithelper/fithelper-front-supabase-data-access';
import { UserService } from '@fithelper/fithelper-front/user/data-access';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { UserFacade } from '@fithelper/fithelper-front/user/facade';
import { userReducer } from '@fithelper/fithelper-front/user/state';

export const ROUTES: Route[] = [
  {
    path: '',
    component: FithelperShellComponent,
    providers: [
      SupabaseService,
      AuthenticationService,
      UserService,
      UserFacade,
      provideStore(),
      provideState({ name: 'fithelper-front', reducer: userReducer }),
      provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode(),
      }),
    ],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@fithelper/fithelper-front/homepage/feature').then(
            (c) => c.HomepageFeatureComponent,
          ),
        canActivate: [notAuthenticatedUser()],
      },
      {
        path: 'login',
        loadComponent: () =>
          import('@fithelper/fithelper-front/login/feature').then(
            (c) => c.FithelperFrontLoginFeatureComponent,
          ),
        canActivate: [authenticatedUser()],
      },
      {
        path: 'register',
        loadComponent: () =>
          import('@fithelper/fithelper-front/register/feature').then(
            (c) => c.FithelperFrontRegisterFeatureComponent,
          ),
        canActivate: [authenticatedUser()],
      },
    ],
  },
];
