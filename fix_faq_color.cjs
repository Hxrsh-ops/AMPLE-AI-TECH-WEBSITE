const fs = require('fs');
let css = fs.readFileSync('src/styles/index.css', 'utf8');

const target1 = `  .amp-faq-mobile-answer {
    display: block;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    padding: 0 24px;
    transition: max-height 0.4s ease, opacity 0.4s ease, padding 0.4s ease;
  }`;

const repl1 = `  .amp-faq-mobile-answer {
    display: block;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    padding: 0 24px;
    transition: max-height 0.4s ease, opacity 0.4s ease, padding 0.4s ease;
    position: relative;
    z-index: 2;
  }`;

css = css.replace(target1, repl1);

const target2 = `  .amp-faq-mobile-answer p {
    font-family: 'Geist', sans-serif;
    font-size: 15px;
    line-height: 1.6;
    color: #707070; /* Muted text color similar to the design */
    margin: 0;
    padding-bottom: 24px; /* Space before the border */
  }`;

const repl2 = `  .amp-faq-mobile-answer p {
    font-family: 'Geist', sans-serif;
    font-size: 15px;
    line-height: 1.6;
    color: #a3a3a3; /* Light muted color for dark background */
    margin: 0;
    padding-bottom: 24px; /* Space before the border */
  }`;

css = css.replace(target2, repl2);

fs.writeFileSync('src/styles/index.css', css);
console.log("CSS patched");
