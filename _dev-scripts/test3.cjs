const fs = require('fs');
const glob = require('fs').readdirSync('dist/assets');
let found = false;
for(const file of glob) {
  if(file.endsWith('.css')) {
    const text = fs.readFileSync('dist/assets/' + file, 'utf8');
    if(text.includes('padding:12px 20px 12px 42px')) {
      console.log("OLD PADDING FOUND IN " + file);
      found = true;
    } else if (text.includes('padding:12px 20px 12px 20px')) {
      console.log("NEW PADDING FOUND IN " + file);
      found = true;
    }
  }
}
if(!found) console.log("NEITHER PADDING FOUND IN CSS");
