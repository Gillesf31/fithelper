import { inject, Injectable } from '@angular/core';
import { Tables } from '@fithelper/fithelper-front/supabase/database/util';
import {
  loadUser,
  logoutButtonClicked,
  selectUser,
} from '@fithelper/fithelper-front/user/state';
import { Store } from '@ngrx/store';

@Injectable()
export class UserFacade {
  private store = inject(Store);
  public selectUser = this.store.selectSignal(selectUser);

  public loadUser(user: Tables<'users'>): void {
    this.store.dispatch(loadUser({ user }));
  }

  public logout(): void {
    this.store.dispatch(logoutButtonClicked());
  }
}
