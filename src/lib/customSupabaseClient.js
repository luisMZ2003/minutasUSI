import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bsoaswgjetecmvpxzqbn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzb2Fzd2dqZXRlY212cHh6cWJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MDY2MjcsImV4cCI6MjA3MTI4MjYyN30.dJb4z2_yX-LQUWFfa5PhIwRZTbrBAp0ZKPaSbZPXnh0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);