import PlaybookLibrary from '../components/playbooks/PlaybookLibrary.jsx'

// /playbooks: shared Nav (sticky on this route, owned by Layout/Nav), the .vpl section, shared Footer.
// Framer page frame bg is #f7f9f7, same as .vpl.
export default function Playbooks() {
  return (
    <main style={{ backgroundColor: '#f7f9f7' }}>
      <PlaybookLibrary />
    </main>
  )
}
