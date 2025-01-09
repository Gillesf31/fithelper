import { Tables } from '@fithelper/fithelper-front/supabase/database/util';
import { createAction, props } from '@ngrx/store';

export const loadUser = createAction(
  '[User] User load after login',
  props<{
    user: Tables<'users'>;
  }>(),
);
