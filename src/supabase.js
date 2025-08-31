import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xysuigxszoglfqtngsb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5c3VpZ3hzem9nbGZxdG5nc2siLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNDYwNzE5NCwiZXhwIjoyMDUwMTgzMTk0fQ.XqAskhNcrJm1hql-shQS8Kf7EhaizeJbD7XwVKLkJ2E'

export const supabase = createClient(supabaseUrl, supabaseKey)

export const auth = {
  signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
  signOut: () => supabase.auth.signOut(),
  getUser: () => supabase.auth.getUser(),
  onAuthStateChange: (callback) => supabase.auth.onAuthStateChange(callback)
}
