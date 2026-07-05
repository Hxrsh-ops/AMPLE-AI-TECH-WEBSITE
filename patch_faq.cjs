const fs = require('fs');
let js = fs.readFileSync('src/js/main.js', 'utf8');

const regex = /faqContainers\.forEach\(container => \{(.*?)\}\);/s;
// wait, faqContainers.forEach happens twice: once in resetAll(), once in the main loop.
