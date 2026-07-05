const fs = require('fs');

const html = fs.readFileSync('about-us.html', 'utf8');
const css = fs.readFileSync('src/styles/index.css', 'utf8');

console.log("=== CHECKING grid .framer-1r9y8fp ===");
let idx = 0;
while (true) {
    idx = html.indexOf('framer-1r9y8fp', idx);
    if (idx === -1) break;
    console.log(`HTML context:`);
    console.log(html.substring(idx - 150, idx + 150));
    console.log("-----------------------------------------");
    idx += 'framer-1r9y8fp'.length;
}

const matches = css.match(/[^\}]*\.framer-1r9y8fp[^\{]*\{[^\}]*\}/g);
if (matches) {
    matches.forEach(m => {
        console.log("CSS rule:");
        console.log(m.trim());
    });
}
