import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@fithelper/fithelper-front/shell/routes').then((r) => r.ROUTES),
  },
];
