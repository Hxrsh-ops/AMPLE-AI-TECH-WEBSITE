const fs = require('fs');
const css = `
div#main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > main:nth-of-type(1) > div:nth-of-type(2) > section#case-studies:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(8) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > a:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > img:nth-of-type(1) {
    content: url('https://framerusercontent.com/images/RspHl7rxQnqaCOgzBcVlgXDmw.svg');
    width: 14px !important;
    height: 14px !important;
    object-fit: contain;
}

div#main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > main:nth-of-type(1) > div:nth-of-type(2) > section#case-studies:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(8) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > a:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > img:nth-of-type(1) {
    content: url('https://framerusercontent.com/images/RspHl7rxQnqaCOgzBcVlgXDmw.svg');
    width: 14px !important;
    height: 14px !important;
    object-fit: contain;
}
`;
fs.appendFileSync('src/styles/index.css', css);
console.log("Appended to CSS.");
