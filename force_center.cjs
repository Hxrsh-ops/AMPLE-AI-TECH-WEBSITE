const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

css += `
/* ABSOLUTE CENTERING FOR MENU BUTTON */
div[data-framer-name^="White - "] {
    position: relative !important;
    display: block !important;
    width: 90px !important; /* specific fixed width for the pill */
    height: 40px !important; /* specific fixed height */
    padding: 0 !important;
}

div[data-framer-name^="White - "] .framer-4sbh13 {
    position: absolute !important;
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) !important;
    width: max-content !important;
    margin: 0 !important;
    padding: 0 !important;
}

div[data-framer-name^="White - "] .framer-4sbh13 p {
    margin: 0 !important;
    padding: 0 !important;
    text-align: center !important;
}

div[data-framer-name="Icon"] {
    display: none !important;
}
`;
fs.writeFileSync('src/styles/index.css', css);
