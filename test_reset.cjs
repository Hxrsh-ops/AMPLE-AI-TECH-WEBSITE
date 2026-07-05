const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

css += `
/* BRUTE FORCE MENU BUTTON CENTERING */
div[data-framer-name^="White - "] {
    padding: 8px 16px !important;
    gap: 0 !important;
    justify-content: center !important;
    align-items: center !important;
}

div[data-framer-name="Icon"] {
    display: none !important;
}

.framer-4sbh13, .framer-4sbh13 * {
    margin: 0 !important;
    padding: 0 !important;
    text-align: center !important;
    width: auto !important;
    min-width: 0 !important;
}
`;
fs.writeFileSync('src/styles/index.css', css);
