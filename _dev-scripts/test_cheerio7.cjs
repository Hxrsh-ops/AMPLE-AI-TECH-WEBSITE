const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('about-us.html', 'utf8');
const $ = cheerio.load(html);
const tile5 = $('div#main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > main:nth-of-type(1) > section#stat:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(5)');
const tile6 = $('div#main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > main:nth-of-type(1) > section#stat:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(6)');
console.log('Tile 5 text:', tile5.text());
console.log('Tile 6 text:', tile6.text());
