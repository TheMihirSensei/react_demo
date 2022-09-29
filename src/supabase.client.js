import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://exfnazpvyvnplxmouwgv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4Zm5henB2eXZucGx4bW91d2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQzMzkwNzEsImV4cCI6MTk3OTkxNTA3MX0.msWt65fj10D1gE15VJypEfd-j06ztEDtJd6OVlhsByQ";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
