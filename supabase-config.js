// COLE AQUI os dados do seu projeto Supabase.
// Use a Project URL e a Publishable/anon key. NUNCA coloque a service_role key aqui.
window.KOALA_SUPABASE_URL = 'COLE_SUA_PROJECT_URL_AQUI';
window.KOALA_SUPABASE_KEY = 'COLE_SUA_PUBLISHABLE_OU_ANON_KEY_AQUI';

window.supabaseClient =
  (window.supabase && window.KOALA_SUPABASE_URL.startsWith('http') &&
   !window.KOALA_SUPABASE_URL.includes('COLE_SUA'))
  ? window.supabase.createClient(window.KOALA_SUPABASE_URL, window.KOALA_SUPABASE_KEY)
  : null;
