// Per-file last-commit dates from git, used for sitemap <lastmod>.
// Vercel clones shallowly: we try to unshallow; if that fails, files whose history is cut off
// get the oldest available commit date (still a valid, never-future date). No git at all -> build date.
import { execSync } from 'node:child_process';
import path from 'node:path';
const ROOT = process.cwd();
const BUILD = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago' }).format(new Date());
const sh = (c) => execSync(c, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 60000, maxBuffer: 64 << 20 });
let MAP = null;
function load() {
  if (MAP) return MAP;
  MAP = new Map();
  try {
    if (sh('git rev-parse --is-shallow-repository').trim() === 'true') { try { sh('git fetch --unshallow --quiet'); } catch {} }
    let date = null;
    for (const line of sh('git log --format=@%cs --name-only HEAD').split('\n')) {
      if (line.startsWith('@')) date = line.slice(1);
      else if (line && !MAP.has(line)) MAP.set(line, date);
    }
  } catch {}
  return MAP;
}
export function lastmodFor(files) {
  const m = load();
  let best = null;
  for (const f of files) {
    const rel = path.relative(ROOT, path.resolve(ROOT, f)).replace(/\\/g, '/');
    const d = m.get(rel);
    if (d && (!best || d > best)) best = d;
  }
  return best && best <= BUILD ? best : BUILD;
}
