const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

css += `
/* KILL THE INLINE ASYMMETRIC PADDING FROM FRAMER CODE COMPONENT */
div[data-framer-name^="White - "] div[data-code-component-plugin-id] > div > div {
    padding-left: 16px !important;
    padding-right: 16px !important;
}
`;
fs.writeFileSync('src/styles/index.css', css);
