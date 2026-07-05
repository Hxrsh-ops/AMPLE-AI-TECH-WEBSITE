const fs = require('fs');
const cheerio = require('cheerio');

const selector = 'div#main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > main:nth-of-type(1) > section#stat:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > p:nth-of-type(1)';

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const $ = cheerio.load(html);
  const target = $(selector);
  if (target.length) {
    console.log(`Found in ${f}:`, target.text());
  }
});
