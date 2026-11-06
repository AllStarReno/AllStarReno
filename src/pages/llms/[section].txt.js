import { TXT_SECTIONS, renderSectionTxt } from '../../lib/ai-formats.mjs';

export function getStaticPaths() {
  return TXT_SECTIONS.map((s) => ({ params: { section: s.id } }));
}

export function GET({ params }) {
  const section = TXT_SECTIONS.find((s) => s.id === params.section);
  if (!section) return new Response('Not found', { status: 404 });
  return new Response(renderSectionTxt(section), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
