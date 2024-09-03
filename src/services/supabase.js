import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://hqqtbuqiwtuetrmwwbia.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxcXRidXFpd3R1ZXRybXd3YmlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUyOTY1NjIsImV4cCI6MjA0MDg3MjU2Mn0.DWfn0D75yZPqpQCvKHdC9Al284VqLyKH35TPCFOwXr0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
