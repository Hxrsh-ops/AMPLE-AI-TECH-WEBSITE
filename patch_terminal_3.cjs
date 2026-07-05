const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

const targetStr2 = `
.showcase-canvas-card:hover {
  border-color: rgba(255, 255, 255, 0.18) !important;
  box-shadow: 
    0 35px 80px rgba(0, 0, 0, 0.75), 
    inset 0 1px 0 rgba(255, 255, 255, 0.18),
    0 0 60px rgba(0, 153, 255, 0.03) !important;
}`.trim();

const replacementStr2 = `
.showcase-canvas-card:hover {
  border-color: rgba(255, 255, 255, 0.2) !important;
  box-shadow: 
    0 40px 100px -10px rgba(0, 0, 0, 0.95), 
    inset 0 1px 1px rgba(255, 255, 255, 0.15) !important;
}`.trim();

if (css.includes(targetStr2)) {
  css = css.replace(targetStr2, replacementStr2);
  console.log('Replaced hover successfully');
} else {
  console.log('Hover target string not found');
}

fs.writeFileSync('src/styles/index.css', css);
