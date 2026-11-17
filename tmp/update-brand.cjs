const fs = require('node:fs');
const path = require('node:path');
function visit(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? visit(path.join(dir,e.name)) : [path.join(dir,e.name)]);
}
for (const file of [...visit('src'), 'index.html', 'README.md', 'package.json', 'package-lock.json']) {
  if (!/\.(vue|js|html|md|json)$/.test(file)) continue;
  const original = fs.readFileSync(file, 'utf8');
  const updated = original.replaceAll('Florida Construction Venture', 'FL CONSTRUCTION VENTURE').replaceAll('FL Venture Corporation', 'FL CONSTRUCTION VENTURE').replaceAll('FL Venture Coporation', 'FL CONSTRUCTION VENTURE').replaceAll('florida-construction-venture', 'fl-construction-venture');
  if (updated !== original) fs.writeFileSync(file, updated);
}
const symbol = fs.readFileSync('public/brand-symbol.svg', 'utf8');
fs.writeFileSync('public/favicon.svg', symbol);
