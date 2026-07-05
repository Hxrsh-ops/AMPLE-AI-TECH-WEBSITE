const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

const idx = css.indexOf('/* Final Centering Fix */');
if (idx !== -1) {
  css = css.substring(0, idx);
}

// Add back just the icon hiding and the mobile menu override
css += `
/* Hide original icon */
.framer-kl0AZ .framer-9uotoe {
    display: none !important;
}

/* Add mobile hamburger */
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
}
`;
fs.writeFileSync('src/styles/index.css', css);
