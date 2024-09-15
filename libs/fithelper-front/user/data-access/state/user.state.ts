import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Tables } from '@fithelper/fithelper-front/supabase/database/util';
import { LoadUser } from './user.action';

export type UserStateModel = {
  user: Tables<'users'> | undefined;
};

@State<UserStateModel>({
  name: 'connectedUser',
  defaults: {
    user: undefined,
  },
})
@Injectable()
export class UserState {
  @Action(LoadUser)
  loadUser(ctx: StateContext<UserStateModel>, action: LoadUser) {
    ctx.patchState({ user: action.user });
  }
}
