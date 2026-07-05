const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /\.framer-styles-preset-[^}]*\}/g;
let matches;
while ((matches = regex.exec(html)) !== null) {
  if (matches[0].includes('24jjpc') || matches[0].includes('padding') || matches[0].includes('margin'))
  console.log(matches[0]);
}
