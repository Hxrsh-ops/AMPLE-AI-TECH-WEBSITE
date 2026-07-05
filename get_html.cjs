const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');
const idx = html.indexOf('White - Desktop');
if (idx !== -1) {
    console.log(html.substring(Math.max(0, idx - 100), idx + 800));
}
