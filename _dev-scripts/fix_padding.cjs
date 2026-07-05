const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

// Strip my previous 'Clean Menu Button Fix'
const idx = css.indexOf('/* Clean Menu Button Fix */');
if (idx !== -1) {
  css = css.substring(0, idx);
}

css += `
/* Final Centering Fix */
.framer-kl0AZ,
.framer-kl0AZ.framer-1amsmis,
.framer-kl0AZ.framer-v-xcfglf,
.framer-kl0AZ.framer-v-1l92tsa,
.framer-kl0AZ.framer-v-8ava36,
.framer-kl0AZ.framer-v-1kqgiur {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    padding: 8px 24px !important;
    gap: 0 !important;
    width: max-content !important;
    min-width: 0 !important;
}

.framer-kl0AZ .framer-9uotoe {
    display: none !important;
}

.framer-kl0AZ .framer-4sbh13 {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    margin: 0 !important;
    padding: 0 !important;
    width: auto !important;
    flex: 0 0 auto !important;
    position: static !important;
    transform: none !important;
}

.framer-kl0AZ .framer-4sbh13 p {
    margin: 0 !important;
    padding: 0 !important;
    text-align: center !important;
}

@media (max-width: 480px) {
  .framer-kl0AZ .framer-4sbh13::before {
    content: "☰";
    font-size: 16px;
    color: white;
    display: block;
    line-height: 1;
    font-weight: normal;
  }
  .framer-kl0AZ .framer-4sbh13 p {
    display: none !important;
  }
  .framer-kl0AZ {
    padding: 8px 16px !important;
  }
}
`;
fs.writeFileSync('src/styles/index.css', css);
