import { Tables } from '@fithelper/fithelper-front/supabase/database/util';
import { loadUser, logoutButtonClicked } from './user.action';
import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export type UserStateModel = {
  user: Tables<'users'> | undefined;
};

export const initialUserState: UserStateModel = {
  user: undefined,
};

export const selectConnectedUserState =
  createFeatureSelector<UserStateModel>('fithelper-front');

export const selectUser = createSelector(
  selectConnectedUserState,
  (state: UserStateModel) => state.user,
);

export const userReducer = createReducer(
  initialUserState,
  on(loadUser, (state, { user }): UserStateModel => ({ ...state, user })),
  on(logoutButtonClicked, (): UserStateModel => initialUserState),
);
