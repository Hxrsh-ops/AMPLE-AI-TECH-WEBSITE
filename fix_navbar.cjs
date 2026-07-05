const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

const replacement = `
@media (max-width: 640px) {
  /* Fix logo overlapping with menu on mobile */
  .framer-1b226dy .framer-1rq7f4y span {
    display: none !important;
  }
}
`;

fs.appendFileSync('src/styles/index.css', replacement);
console.log('Navbar fix applied!');
