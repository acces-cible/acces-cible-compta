import { createClient } from '@supabase/supabase-js'

export default async function Dashboard() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_LEGACY_ANON_KEY
  )

  const { data: comptes, error } = await supabase
    .from('comptes')
    .select('numero, nom, type, solde_ouverture')

  if (error) {
    return <main style={{ padding: '2rem' }}>
      <h1>Erreur</h1>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </main>
  }

  const actif = comptes
    ?.filter(c => c.type === 'ACTIF')
    .reduce((sum, c) => sum + (parseFloat(c.solde_ouverture) || 0), 0)

  const passif = comptes
    ?.filter(c => c.type === 'PASSIF')
    .reduce((sum, c) => sum + (parseFloat(c.solde_ouverture) || 0), 0)

  const capitaux = comptes
    ?.filter(c => c.type === 'CAPITAUX')
    .reduce((sum, c) => sum + (parseFloat(c.solde_ouverture) || 0), 0)

  const fmt = (n) => n?.toLocaleString('fr-CA
