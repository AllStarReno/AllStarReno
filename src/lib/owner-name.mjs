// Owner decision: the owner's name appears only on the About page itself and in the founder schema.
// Generated digests (llms-full.txt, ask-index.json) that pull About page text get neutral wording instead.
export const scrubOwner = (s) => String(s ?? '')
  .replace(/About All-Star Renovations \| Thomas Pedersen, Conway AR/g, 'About All-Star Renovations | Conway AR')
  .replace(/founded in 2014 by Thomas Pedersen/g, 'founded in 2014')
  .replace(/Thomas Pedersen founded All-Star Renovations in 2014 and runs it from Conway, Arkansas\./g, 'All-Star Renovations was founded in 2014 and is run from Conway, Arkansas.')
  .replace(/Thomas Pedersen started All-Star Renovations in 2014 and still leads it\./g, 'All-Star Renovations was started in 2014 and is still owner-led.')
  .replace(/I recommend calling Thomas for/g, 'I recommend calling [All-Star Renovations] for')
  .replace(/Talk with Thomas/g, 'Talk with Our Team')
  .replace(/call Thomas directly/g, 'call us directly')
  .replace(/Thomas Pedersen|Pedersen|\bThomas\b/g, 'the All-Star Renovations team');
