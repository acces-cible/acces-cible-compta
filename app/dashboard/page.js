import { supabase } from '../../lib/supabase'

export default async function Dashboard() {
  const { data: comptes } = await supabase
    .from('comptes')
    .select('numero, nom, type, solde_ouverture')

  const actif = comptes
    ?.filter(c => c.type === 'ACTIF')
    .reduce((sum, c) => sum + (parseFloat(c.solde_ouverture) || 0), 0)

  const passif = comptes
    ?.filter(c => c.type === 'PASSIF')
    .reduce((sum, c) => sum + (parseFloat(c.solde_ouverture) || 0), 0)

  const capitaux = comptes
    ?.filter(c => c.type === 'CAPITAUX')
    .reduce((sum, c) => sum + (parseFloat(c.solde_ouverture) || 0), 0)

  const fmt = (n) => n?.toLocaleString('fr-CA', { 
    style: 'currency', currency: 'CAD' 
  })

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Tableau de bord</h1>
      <p>Les Adaptations Accès-Cible Inc. — Exercice 2025-2026</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '2rem' }}>
        <div style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '8px' }}>
          <div style={{ fontSize: '14px', color: '#666' }}>Actif total</div>
          <div style={{ fontSize: '28px', fontWeight: '600', marginTop: '0.5rem' }}>{fmt(actif)}</div>
        </div>
        <div style={{ background: '#fff0f0', padding: '1.5rem', borderRadius: '8px' }}>
          <div style={{ fontSize: '14px', color: '#666' }}>Passif total</div>
          <div style={{ fontSize: '28px', fontWeight: '600', marginTop: '0.5rem' }}>{fmt(passif)}</div>
        </div>
        <div style={{ background: '#f0fff4', padding: '1.5rem', borderRadius: '8px' }}>
          <div style={{ fontSize: '14px', color: '#666' }}>Capitaux propres</div>
          <div style={{ fontSize: '28px', fontWeight: '600', marginTop: '0.5rem' }}>{fmt(capitaux)}</div>
        </div>
      </div>
    </main>
  )
}
