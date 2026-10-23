import { defineConfig } from 'astro/config';
// Static output. build.format 'file' emits /about.html etc. so Vercel cleanUrls serves
// identical paths (/about) and every vercel.json redirect/header keeps working.
export default defineConfig({
  site: 'https://allstarreno.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'auto' },
  compressHTML: false,
});
