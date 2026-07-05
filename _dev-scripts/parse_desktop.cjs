const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /\.framer-v-xcfglf[^}]*\}/g;
let matches;
while ((matches = regex.exec(html)) !== null) {
  console.log(matches[0]);
}
