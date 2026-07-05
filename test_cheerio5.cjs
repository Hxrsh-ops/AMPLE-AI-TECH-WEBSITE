const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('about-us.html', 'utf8');
const $ = cheerio.load(html);
const tile4 = $('div#main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > main:nth-of-type(1) > section#stat:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(4)');
console.log('Tile 4 html:', tile4.html());
