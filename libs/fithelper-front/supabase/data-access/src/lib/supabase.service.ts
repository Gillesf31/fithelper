import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  public readonly supabaseClient: SupabaseClient;

  constructor() {
    const supabaseUrl = 'https://cfxhxempgckdyyldndno.supabase.co';
    const supabaseKey =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmeGh4ZW1wZ2NrZHl5bGRuZG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIzODQyNDAsImV4cCI6MTk5Nzk2MDI0MH0.RPRoWrAsNC-VKng2l-AnsyvOaSw2oWsBoCp7cKb9bKA';
    this.supabaseClient = createClient(supabaseUrl, supabaseKey);
  }
}
