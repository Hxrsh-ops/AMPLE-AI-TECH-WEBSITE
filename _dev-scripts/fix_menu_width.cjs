const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

css += `
.framer-kl0AZ {
  width: max-content !important;
  min-width: 0 !important;
  max-width: none !important;
  flex: 0 0 auto !important;
}
`;
fs.writeFileSync('src/styles/index.css', css);
