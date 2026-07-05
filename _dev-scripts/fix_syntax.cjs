const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

// I'll just append it cleanly at the end, and remove my brute force comments.
// Let's strip all lines from "/* BRUTE FORCE MENU BUTTON CENTERING */" and "/* ABSOLUTE CENTERING FOR MENU BUTTON" onwards
const idx1 = css.indexOf('/* BRUTE FORCE MENU BUTTON CENTERING */');
const idx2 = css.indexOf('/* ABSOLUTE CENTERING FOR MENU BUTTON');

const minIdx = Math.min(
  idx1 !== -1 ? idx1 : Infinity, 
  idx2 !== -1 ? idx2 : Infinity
);

if (minIdx !== Infinity) {
  css = css.substring(0, minIdx);
}

css += `
/* ABSOLUTE CENTERING FOR MENU BUTTON DESKTOP ONLY */
@media (min-width: 481px) {
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
}
`;
fs.writeFileSync('src/styles/index.css', css);
