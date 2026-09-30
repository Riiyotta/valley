// Shared submit behaviour for the long-form "Book a call" forms (index hero, sidebar
// "Try Valley", inline CTA cards). The live forms feed the Surface demo flow; the clone
// validates the fields with the browser's constraint validation, then sends the visitor to
// the same external URL. No field values are stored or forwarded.
export const BOOK_A_CALL_URL = 'https://forms.withsurface.com/s/cmf7e6uw600amlb0cmoloma5b'

export function submitToBookACall(event) {
  event.preventDefault()
  const form = event.currentTarget
  if (!form.reportValidity()) return
  window.location.assign(BOOK_A_CALL_URL)
}
