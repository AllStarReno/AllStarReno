// Loads the original allstarreno.com HTML pages (src/legacy) so every URL, its content
// and its interactive features (coverage map, city guides, ZIP search) are preserved 1:1.
import fs from 'node:fs';
import path from 'node:path';
import { SITE } from '../data/business.mjs';

const ROOT = path.resolve('src/legacy');
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.html') ? [path.join(d, e.name)] : []);

const pick = (re, s) => { const m = s.match(re); return m ? m[1] : ''; };
const dec = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const attr = (tag, name) => pick(new RegExp(`${name}="([^"]*)"`), tag);

function meta(head, key, val) {
  for (const t of head.match(/<meta\b[^>]*>/g) || []) if (attr(t, key) === val) return dec(attr(t, 'content'));
  return '';
}

export function slugFor(file) {
  let rel = path.relative(ROOT, file).replace(/\\/g, '/').replace(/\.html$/, '');
  if (rel === 'index') return '';
  return rel.replace(/\/index$/, '');
}

export function loadPages() {
  return walk(ROOT).map((file) => {
    const html = fs.readFileSync(file, 'utf8');
    const head = pick(/<head>([\s\S]*?)<\/head>/, html);
    const bodyTag = pick(/(<body[^>]*>)/, html);
    const LD = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
    const rawBody = pick(/<body[^>]*>([\s\S]*)<\/body>/, html);
    const body = rawBody.replace(LD, '');
    const slug = slugFor(file);
    const jsonld = [...head.matchAll(LD), ...rawBody.matchAll(LD)].map((m) => JSON.parse(m[1]));
    // keep non-SEO head assets (fonts, css, inline styles, scripts) exactly as they were
    const assets = (head.match(/<link\b[^>]*>|<style>[\s\S]*?<\/style>|<script(?![^>]*ld\+json)[^>]*>[\s\S]*?<\/script>/g) || [])
      .filter((t) => !/rel="canonical"|canonical"/.test(t));
    return {
      file, slug,
      url: `${SITE}/${slug}`.replace(/\/$/, '') + (slug === '' ? '/' : ''),
      title: dec(pick(/<title>([\s\S]*?)<\/title>/, head)).trim(),
      description: meta(head, 'name', 'description'),
      robots: meta(head, 'name', 'robots'),
      ogImage: meta(head, 'property', 'og:image'),
      ogImageAlt: meta(head, 'property', 'og:image:alt'),
      ogType: meta(head, 'property', 'og:type') || 'website',
      bodyClass: attr(bodyTag, 'class'),
      assets, body, jsonld,
      hasBreadcrumb: /aria-label="Breadcrumb"/i.test(body),
      indexable: !/noindex/i.test(meta(head, 'name', 'robots')) && !slug.startsWith('ads/') && !slug.endsWith('-mobile') && slug !== '404',
    };
  });
}
