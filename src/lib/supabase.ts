import { createClient} from "@supabase/supabase-js";
import { Database } from './database.types'
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseApiKey = process.env.SUPABASE_ANON_KEY as string;

const options = {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
}

export const supabase = createClient<Database>(supabaseUrl, supabaseApiKey, options);