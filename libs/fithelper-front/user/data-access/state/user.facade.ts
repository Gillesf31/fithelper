import { Store } from '@ngxs/store';
import { inject, Injectable } from '@angular/core';
import { LoadUser } from './user.action';
import { Tables } from '@fithelper/fithelper-front/supabase/database/util';

@Injectable()
export class UserFacade {
  private store = inject(Store);

  public loadUser(user: Tables<'users'>): void {
    this.store.dispatch(new LoadUser(user));
  }
}
