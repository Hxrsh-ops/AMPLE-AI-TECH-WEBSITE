const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

css += `
/* Bulletproof Menu Button Reset */
.framer-kl0AZ {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0 !important;
  padding: 8px 16px !important;
  border-radius: 50px !important;
  width: auto !important;
  max-width: max-content !important;
  min-width: 0 !important;
  margin: 0 !important;
}

.framer-kl0AZ::before, .framer-kl0AZ::after {
  content: none !important;
  /* wait, if we remove ::after we lose the border from data-border! Let's keep it but remove space-taking pseudos */
}

.framer-4sbh13 {
  display: block !important;
  width: auto !important;
  margin: 0 !important;
  padding: 0 !important;
  transform: none !important;
  position: static !important;
}

.framer-9uotoe {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  position: absolute !important;
}
`;
fs.writeFileSync('src/styles/index.css', css);
