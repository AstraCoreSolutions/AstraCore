"use client"

import { createClient } from "@supabase/supabase-js"

// Na Netlify musí být tyto proměnné nastavené v Environment variables.
// Pokud chybí, build nespadne, ale vypíšeme varování.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost"
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "missing-anon-key"

if (
  SUPABASE_URL === "http://localhost" ||
  SUPABASE_ANON_KEY === "missing-anon-key"
) {
  console.warn(
    "[AstraCore] Chybí proměnné NEXT_PUBLIC_SUPABASE_URL nebo NEXT_PUBLIC_SUPABASE_ANON_KEY v Netlify → Site configuration → Environment variables."
  )
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
