import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@fithelper/fithelper-front/homepage/feature').then(
        (c) => c.HomepageFeatureComponent
      ),
  },
];
