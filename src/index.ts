import 'dotenv/config';
import { supabase } from './lib/supabaseClient';

async function main() {
  // Example Supabase query
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .limit(1);

  console.log(data);
}

main();
