// Builds the standalone error pages (403.html, 500.html, ...) that the web server shows
// when the Vue app itself can't run. Each one is a single self-contained file: no script,
// and nothing from the app bundle, so it still displays when the app is the thing that broke.
// The wording comes from src/data/errors.js; the look repeats src/views/NotFoundView.vue.
import { errors } from './src/data/errors.js'
import { company } from './src/data/site.js'

const page = (code, { label, title, text, retry }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#193d59">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<title>${code} ${label} | ${company.name}</title>
<style>
@font-face { font-family: 'DM Sans'; src: url('/fonts/dm-sans-variable.ttf') format('truetype'); font-weight: 100 1000; font-display: swap; }
* { box-sizing: border-box; }
body { display: flex; flex-direction: column; min-height: 100vh; margin: 0; background: #f8fafb; color: #193d59; font-family: 'DM Sans', Arial, sans-serif; text-align: center; }
a { color: inherit; text-decoration: none; }
:focus-visible { outline: 3px solid #e9773e; outline-offset: 5px; }
header, footer { padding: 26px 24px; }
header { background: #fff; border-bottom: 1px solid #dce3e7; }
.brand { display: inline-flex; align-items: center; gap: 10px; text-align: left; }
.brand img { width: 48px; height: 48px; }
.brand span { display: grid; gap: 3px; }
.brand strong { font-size: 18px; line-height: 1.1; letter-spacing: .025em; }
.brand small { font-size: 11px; font-weight: 700; letter-spacing: .3em; }
main { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 30px 24px 50px; }
main > * { animation: rise .9s ease both; }
.code { margin: 0 0 18px; color: #193d59; font-size: clamp(120px, 21vw, 250px); font-weight: 700; line-height: .86; letter-spacing: -.03em; }
.code span { color: #e9773e; }
.kicker { position: relative; margin: 0 0 15px; padding-left: 20px; color: #65747e; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: .12em; text-transform: uppercase; }
.kicker::before { content: ''; position: absolute; left: 0; top: 50%; width: 8px; height: 8px; border-radius: 50%; background: #e9773e; transform: translateY(-50%); }
h1 { text-wrap: balance; margin: 0 0 16px; font-size: clamp(34px, 4.2vw, 56px); font-weight: 700; line-height: 1.15; letter-spacing: -.03em; animation-delay: .1s; }
.text { max-width: 520px; margin: 0 0 30px; color: #65747e; font-size: 17px; line-height: 1.6; animation-delay: .2s; }
.actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; animation-delay: .3s; }
.actions a { padding: 16px 24px; border: 1px solid transparent; font-size: 16px; font-weight: 700; line-height: 1; transition: background .3s, color .3s, border-color .3s; }
.solid { background: #e9773e; color: #fff; }
.ghost { border-color: #193d59 !important; }
.actions a:hover { border-color: #193d59 !important; background: #193d59; color: #fff; }
footer { color: #65747e; font-size: 14px; }
footer a { color: #193d59; font-weight: 600; text-decoration: underline; text-underline-offset: 4px; }
@keyframes rise { from { opacity: 0; transform: translate3d(0, 30px, 0); } to { opacity: 1; transform: none; } }
@media (max-width: 700px) { .text { font-size: 16px; } .kicker { font-size: 12px; } }
@media (prefers-reduced-motion: reduce) { main > * { animation: none; } }
</style>
</head>
<body>
<header>
  <a class="brand" href="/" aria-label="${company.name} home">
    <img src="/brand-symbol.svg" alt="" width="48" height="48">
    <span><strong>FL CONSTRUCTION</strong><small>VENTURE</small></span>
  </a>
</header>
<main>
  <p class="code" aria-hidden="true">${String(code).replace(/^(.)(.)(.)$/, '$1<span>$2</span>$3')}</p>
  <p class="kicker">Error ${code} · ${label}</p>
  <h1>${title}</h1>
  <p class="text">${text}</p>
  <div class="actions">
    ${retry ? '<a class="solid" href="">Try again</a>\n    <a class="ghost" href="/">Back to home</a>' : '<a class="solid" href="/">Back to home</a>'}
  </div>
</main>
<footer>Need help now? Call <a href="tel:${company.phone}">${company.phoneDisplay}</a></footer>
</body>
</html>
`

export const renderErrorPage = code => page(code, errors[code])

// Vite plugin: writes one file per error into the build, and serves the same pages
// from the dev server so they can be previewed at /500.html and so on.
export function errorPages() {
  return {
    name: 'error-pages',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const code = req.url?.match(/^\/(\d{3})\.html(?:\?.*)?$/)?.[1]
        if (!errors[code]) return next()
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(renderErrorPage(code))
      })
    },
    generateBundle() {
      for (const code of Object.keys(errors)) {
        this.emitFile({ type: 'asset', fileName: `${code}.html`, source: renderErrorPage(code) })
      }
    },
  }
}
