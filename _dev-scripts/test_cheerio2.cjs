const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('about-us.html', 'utf8');
const $ = cheerio.load(html);

console.log('4th tile subscript:', $('div#main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > main:nth-of-type(1) > section#stat:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(4) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > p:nth-of-type(1)').text());
console.log('5th tile subscript:', $('div#main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > main:nth-of-type(1) > section#stat:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > p:nth-of-type(1)').text());
