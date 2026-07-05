const fs = require('fs');
const text = fs.readFileSync('dist/index.html', 'utf8');
const idx = text.indexOf('.framer-kl0AZ.framer-v-xcfglf');
if(idx > -1) {
  console.log("Found in index.html");
  console.log(text.substring(idx, idx + 100));
} else {
  console.log("Not found in dist/index.html");
}
