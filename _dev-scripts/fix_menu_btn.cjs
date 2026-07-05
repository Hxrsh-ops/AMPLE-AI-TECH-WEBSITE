const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

css += `
/* Force Menu Button text to center */
.framer-kl0AZ {
  width: max-content !important;
  min-width: 0 !important;
}
.framer-4sbh13 {
  margin: 0 !important;
  padding: 0 !important;
  left: 0 !important;
  right: 0 !important;
  transform: none !important;
  width: auto !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
.framer-4sbh13 p {
  margin: 0 !important;
  padding: 0 !important;
  text-align: center !important;
}
`;

fs.writeFileSync('src/styles/index.css', css);
