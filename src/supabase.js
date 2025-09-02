import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xysuigxszoglfqtngskb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5c3VpZ3hzem9nbGZxdG5nc2siLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNDYwNzE5NCwiZXhwIjoyMDUwMTgzMTk0fQ.XqAskhNcrJm1hql-shQS8Kf7EhaizeJbD7XwVKLkJ2E'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const auth = {
  signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
  signOut: () => supabase.auth.signOut(),
  getUser: () => supabase.auth.getUser(),
  onAuthStateChange: (callback) => supabase.auth.onAuthStateChange(callback)
}

export const db = {
  // Klienti
  getKlienti: () => supabase.from('klienti').select('*'),
  addKlient: (data) => supabase.from('klienti').insert([data]),
  updateKlient: (id, data) => supabase.from('klienti').update(data).eq('id', id),
  deleteKlient: (id) => supabase.from('klienti').delete().eq('id', id),

  // Zakázky
  getZakazky: () => supabase.from('zakazky').select(`
    *,
    klienti (nazev),
    zamestnanci (jmeno, prijmeni)
  `),
  getZakazka: (id) => supabase.from('zakazky').select(`
    *,
    klienti (*),
    zamestnanci (jmeno, prijmeni),
    stavebni_denik (*)
  `).eq('id', id).single(),
  addZakazka: (data) => supabase.from('zakazky').insert([data]),
  updateZakazka: (id, data) => supabase.from('zakazky').update(data).eq('id', id),

  // Stavební deník
  getStavebniDenik: (zakazkaId) => supabase.from('stavebni_denik').select('*').eq('zakazka_id', zakazkaId),
  addStavebniDenik: (data) => supabase.from('stavebni_denik').insert([data]),

  // Faktury
  getFakturyVystavene: () => supabase.from('faktury_vystavene').select(`
    *,
    klienti (nazev),
    zakazky (nazev)
  `),
  getFakturyPrijate: () => supabase.from('faktury_prijate').select(`
    *,
    dodavatele (nazev),
    zakazky (nazev)
  `),

  // Zaměstnanci
  getZamestnanci: () => supabase.from('zamestnanci').select('*').eq('aktivni', true),
  
  // Dodavatelé
  getDodavatele: () => supabase.from('dodavatele').select('*'),
  
  // Nemovitosti
  getNemovitosti: () => supabase.from('nemovitosti').select('*'),
  
  // Sklady
  getSkladMaterial: () => supabase.from('sklad_material').select('*'),
  getSkladNaradi: () => supabase.from('sklad_naradi').select('*'),
  
  // Flotila
  getFlotila: () => supabase.from('flotila').select('*'),
  
  // Stavební projekty
  getStavebniProjekty: () => supabase.from('stavebni_projekty').select('*')
}
