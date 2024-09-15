import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '@fithelper/fithelper-front/environments/util';

@Injectable()
export class SupabaseService {
  public readonly supabaseClient: SupabaseClient;

  constructor() {
    const supabaseUrl = environment.supabaseUrl;
    const supabaseKey = environment.supabaseKey;
    this.supabaseClient = createClient(supabaseUrl, supabaseKey);
  }
}
