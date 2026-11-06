import { MD_PAGES, renderMarkdown } from '../lib/ai-formats.mjs';

export function getStaticPaths() {
  return MD_PAGES.map((p) => ({ params: { slug: p.slug } }));
}

export function GET({ params }) {
  const page = MD_PAGES.find((p) => p.slug === params.slug);
  if (!page) return new Response('Not found', { status: 404 });
  return new Response(renderMarkdown(page), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
