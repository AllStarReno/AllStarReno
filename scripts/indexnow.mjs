// IndexNow submit: node scripts/indexnow.mjs [--all]
// Default: submits sitemap URLs whose <lastmod> is today or within --days N (default 2). --all submits every URL.
const HOST = 'allstarreno.com', KEY = '6a39220f02001b770c0a334155fe232e';
const SITEMAPS = ['https://allstarreno.com/sitemap.xml', 'https://allstarreno.com/docs/sitemap.xml'];
const all = process.argv.includes('--all');
const di = process.argv.indexOf('--days'); const days = di > 0 ? Number(process.argv[di + 1]) : 2;
const cutoff = Date.now() - days * 864e5;
const urls = new Set();
for (const sm of SITEMAPS) {
  const xml = await (await fetch(sm)).text();
  for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = m[1].match(/<loc>([^<]+)/)?.[1]; const lm = m[1].match(/<lastmod>([^<]+)/)?.[1];
    if (loc && loc.includes(HOST) && (all || !lm || Date.parse(lm) >= cutoff)) urls.add(loc.trim());
  }
}
const list = [...urls];
console.log(`Submitting ${list.length} URLs`);
for (let i = 0; i < list.length; i += 10000) {
  const r = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: list.slice(i, i + 10000) }) });
  console.log(`IndexNow HTTP ${r.status} ${await r.text()}`);
}
