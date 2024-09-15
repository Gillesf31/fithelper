import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { map, Observable } from 'rxjs';
import { User } from '@supabase/supabase-js';

export function notAuthenticatedUser(): CanActivateFn {
  return (): Observable<boolean> => {
    const user$ = inject(AuthenticationService).user$;
    const router = inject(Router);

    return user$.pipe(
      map((session: User | null) => {
        if (session) {
          return true;
        } else {
          router.navigate(['/login']);
          return false;
        }
      }),
    );
  };
}

export function authenticatedUser(): CanActivateFn {
  return (): Observable<boolean> => {
    const user$ = inject(AuthenticationService).user$;
    const router = inject(Router);

    return user$.pipe(
      map((session: User | null) => {
        if (session) {
          router.navigate(['']);
          return false;
        } else {
          return true;
        }
      }),
    );
  };
}
