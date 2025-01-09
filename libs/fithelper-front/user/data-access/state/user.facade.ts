import { inject, Injectable } from '@angular/core';
import { Tables } from '@fithelper/fithelper-front/supabase/database/util';
import { Store } from '@ngrx/store';
import { loadUser } from './user.action';

@Injectable()
export class UserFacade {
  private store = inject(Store);

  public loadUser(user: Tables<'users'>): void {
    console.warn('UserFacade.loadUser', user);
    this.store.dispatch(loadUser({ user }));
  }
}
