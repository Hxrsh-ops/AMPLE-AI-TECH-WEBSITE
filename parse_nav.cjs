const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const idx = html.indexOf('framer-1ujr9vo');
if (idx !== -1) {
  console.log(html.substring(idx - 50, idx + 250));
}
