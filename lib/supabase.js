import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hjurjrqownwqlumeppge.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqdXJqcnFvd253cWx1bWVwcGdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3ODA4ODgsImV4cCI6MjA5MjM1Njg4OH0.ByZQJlYByal0OHNz1UP8rj0LypmATZGMmw5FU1k0gP8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
