import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://tgbfmzqjdyefcbqwiadn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnYmZtenFqZHllZmNicXdpYWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM2MTQ0NjIsImV4cCI6MjAyOTE5MDQ2Mn0.H9PcWzGeXB6CzlloxJk0bz08CSXagAZ2dJuRer8XxOE";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
