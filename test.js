const fs = require('fs');
const text = fs.readFileSync('index.html', 'utf8');
const idx = text.indexOf('White - Desktop');
if(idx > -1) {
  console.log(text.substring(Math.max(0, idx - 150), idx + 200));
}
