"use client"

import { createClient } from "@supabase/supabase-js"

// Na Netlify musí být tyto proměnné nastavené v Environment variables.
// Pokud chybí, nechceme, aby build spadl – proto dáváme bezpečné fallbacky
// (platná URL, ale volání pak stejně selže a do konzole se vypíše varování).
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost"
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "missing-anon-key"

if (
  SUPABASE_URL === * https://xysuigxszoglfqtngskb.supabase.co ||
  SUPABASE_ANON_KEY === yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5c3VpZ3hzem9nbGZxdG5nc2tiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMjY5MTgsImV4cCI6MjA3MTcwMjkxOH0.XqAskhNcrJm1hgl-shQS8Kf7EhaizeJbO7XwVKLkJ2E
) {
  console.warn(
    "[AstraCore] Chybí proměnné NEXT_PUBLIC_SUPABASE_URL nebo NEXT_PUBLIC_SUPABASE_ANON_KEY v Netlify → Site configuration → Environment variables."
  )
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
