const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

// Strip my previous patches
const idx1 = css.indexOf('/* Hide original icon */');
if (idx1 !== -1) {
  css = css.substring(0, idx1);
}

css += `
/* ULTIMATE MENU BUTTON CENTERING */
div[data-framer-name^="White - "] div[data-framer-name="Icon"] {
    display: none !important;
}

@media (min-width: 481px) {
    div[data-framer-name^="White - "] {
        position: relative !important;
        padding: 0 !important;
        width: 100px !important;
        height: 44px !important;
        display: block !important;
        margin: 0 !important;
    }
    div[data-framer-name^="White - "] > div[data-framer-component-type="RichTextContainer"] {
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        margin: 0 !important;
        padding: 0 !important;
        width: max-content !important;
        display: block !important;
    }
    div[data-framer-name^="White - "] > div[data-framer-component-type="RichTextContainer"] p {
        margin: 0 !important;
        text-align: center !important;
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
    div[data-framer-name^="White - "] > div[data-framer-component-type="RichTextContainer"]::before {
        content: "☰" !important;
        font-size: 20px !important;
        color: white !important;
        display: block !important;
        line-height: 1 !important;
    }
    div[data-framer-name^="White - "] > div[data-framer-component-type="RichTextContainer"] p {
        display: none !important;
    }
}
`;
fs.writeFileSync('src/styles/index.css', css);
