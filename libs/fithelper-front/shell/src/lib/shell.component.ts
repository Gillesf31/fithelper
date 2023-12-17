import { Routes } from '@angular/router';
import { AuthenticationService } from '@fithelper/fithelper-front/authentication/data-access';

export const ROUTES: Routes = [
  {
    providers: [AuthenticationService],
    path: '',
    loadComponent: () =>
      import('@fithelper/fithelper-front/homepage/feature').then(
        (c) => c.HomepageFeatureComponent
      ),
  },
];
