const fs = require('fs');
const text = fs.readFileSync('dist/index.html', 'utf8');
if(text.includes('padding:12px 20px 12px 42px')) {
  console.log("OLD PADDING FOUND");
} else if (text.includes('padding:12px 20px 12px 20px')) {
  console.log("NEW PADDING FOUND");
} else {
  console.log("NEITHER PADDING FOUND");
}
