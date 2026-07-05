const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const start = html.indexOf('<div class="framer-kl0AZ');
if (start !== -1) {
  const substr = html.substring(start, start + 1000);
  console.log(substr);
}
