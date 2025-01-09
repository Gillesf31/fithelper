import { Tables } from '@fithelper/fithelper-front/supabase/database/util';
import { loadUser } from './user.action';
import { createReducer, on } from '@ngrx/store';

export type UserStateModel = {
  user: Tables<'users'> | undefined;
};

export const initialUserState: UserStateModel = {
  user: undefined,
};

export const userReducer = createReducer(
  initialUserState,
  on(loadUser, (state, { user }): UserStateModel => ({ ...state, user })),
);
