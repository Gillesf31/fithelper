import { Tables } from '@fithelper/fithelper-front/supabase/database/util';

export class LoadUser {
  static readonly type = '[User] User load after login';

  constructor(public user: Tables<'users'>) {}
}
