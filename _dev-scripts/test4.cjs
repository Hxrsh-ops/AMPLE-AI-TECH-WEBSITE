const fs = require('fs');
const glob = require('fs').readdirSync('dist/assets');
for(const file of glob) {
  if(file.endsWith('.css')) {
    const text = fs.readFileSync('dist/assets/' + file, 'utf8');
    const idx = text.indexOf('.framer-kl0AZ.framer-v-xcfglf.framer-1amsmis');
    if (idx > -1) {
      console.log("Found in " + file);
      console.log(text.substring(idx, idx + 100));
    }
  }
}
