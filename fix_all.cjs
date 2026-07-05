const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

// Strip previous patches
const idx1 = css.indexOf('/* ULTIMATE MENU BUTTON CENTERING */');
if (idx1 !== -1) {
  css = css.substring(0, idx1);
}

css += `
/* ULTIMATE MENU BUTTON CENTERING (FIXED FOR CODE COMPONENT) */
div[data-framer-name^="White - "] div[data-framer-name="Icon"] {
    display: none !important;
}

/* Override the inline padding inside the code component */
div[data-framer-name^="White - "] div[data-code-component-plugin-id] > div > div {
    padding-left: 16px !important;
    padding-right: 16px !important;
}

@media (min-width: 481px) {
    div[data-framer-name^="White - "] {
        position: relative !important;
        padding: 0 !important;
        width: 90px !important;
        height: 40px !important;
        display: block !important;
        margin: 0 !important;
    }
    div[data-framer-name^="White - "] > div[data-code-component-plugin-id],
    div[data-framer-name^="White - "] > .framer-4sbh13,
    div[data-framer-name^="White - "] > div[class*="-container"] {
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        margin: 0 !important;
        padding: 0 !important;
        width: max-content !important;
        display: block !important;
    }
}

@media (max-width: 480px) {
    div[data-framer-name^="White - "] {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        padding: 0 !important;
        width: 44px !important;
        height: 44px !important;
    }
    div[data-framer-name^="White - "] > div[data-code-component-plugin-id]::before,
    div[data-framer-name^="White - "] > .framer-4sbh13::before {
        content: "☰" !important;
        font-size: 20px !important;
        color: white !important;
        display: block !important;
        line-height: 1 !important;
    }
    div[data-framer-name^="White - "] > div[data-code-component-plugin-id] > div,
    div[data-framer-name^="White - "] > .framer-4sbh13 p {
        display: none !important;
    }
}
`;
fs.writeFileSync('src/styles/index.css', css);
