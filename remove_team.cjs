const fs = require('fs');
const cheerio = require('cheerio');
const file = 'about-us.html';
const html = fs.readFileSync(file, 'utf8');
const $ = cheerio.load(html);

const t1 = $('div#main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > main:nth-of-type(1) > section#team:nth-of-type(4) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > img:nth-of-type(1)');
const t2 = $('div#main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > main:nth-of-type(1) > section#team:nth-of-type(4) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(5) > div:nth-of-type(1)');

t1.remove();
t2.remove();

fs.writeFileSync(file, $.html());
console.log('Removed elements from', file);
