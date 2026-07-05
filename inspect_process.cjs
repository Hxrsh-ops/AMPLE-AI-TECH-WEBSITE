const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const processNode = $('[data-framer-name="Services"]').parent();
console.log(processNode.attr('class'), processNode.get(0).tagName);
console.log(processNode.html().substring(0, 300));
