// Fallback for internal routes that aren't built yet.
export default function NotFound() {
  return (
    <main style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', paddingTop: 84, background: '#f8f9f7' }}>
      <p style={{ font: '16px "Valley Body Montreal", Arial, sans-serif', color: '#5b6b6a' }}>Page not built yet.</p>
    </main>
  )
}
