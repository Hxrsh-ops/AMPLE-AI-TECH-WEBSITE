const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

// Replace the bad rule using regex
css = css.replace(/\.framer-kl0AZ::before, \.framer-kl0AZ::after \{[\s\S]*?\}/, '');

fs.writeFileSync('src/styles/index.css', css);
