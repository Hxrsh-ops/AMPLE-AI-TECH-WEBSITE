const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /\.framer-5qny4e-container[^}]*\}/g;
let matches;
while ((matches = regex.exec(html)) !== null) {
  console.log(matches[0]);
}

const regex2 = /\.framer-1wd8sgv[^}]*\}/g;
while ((matches = regex2.exec(html)) !== null) {
  console.log(matches[0]);
}
