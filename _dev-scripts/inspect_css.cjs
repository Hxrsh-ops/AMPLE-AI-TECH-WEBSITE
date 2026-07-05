const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /\.framer-kl0AZ[^}]*\}/g;
let match;
while ((match = regex.exec(html)) !== null) {
  if (match[0].includes('xcfglf')) {
    console.log(match[0]);
  }
}
