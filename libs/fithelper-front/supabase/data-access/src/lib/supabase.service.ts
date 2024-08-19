import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  public readonly supabaseClient: SupabaseClient;

  constructor() {
    // TODO: Move this to environment file
    const supabaseUrl = 'https://your-url.supabase.co';
    const supabaseKey = 'your-key';
    this.supabaseClient = createClient(supabaseUrl, supabaseKey);
  }
}
