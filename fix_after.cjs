const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');
css = css.replace('.framer-kl0AZ::before, .framer-kl0AZ::after {\n  content: none !important;\n  /* wait, if we remove ::after we lose the border from data-border! Let's keep it but remove space-taking pseudos */\n}', '');
fs.writeFileSync('src/styles/index.css', css);
