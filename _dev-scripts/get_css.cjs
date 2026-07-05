const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regexKl = /\.framer-kl0AZ[^}]*\}/g;
const regex4s = /\.framer-4sbh13[^}]*\}/g;

let matches;
console.log('--- kl0AZ ---');
while ((matches = regexKl.exec(html)) !== null) {
  console.log(matches[0]);
}

console.log('--- 4sbh13 ---');
while ((matches = regex4s.exec(html)) !== null) {
  console.log(matches[0]);
}

