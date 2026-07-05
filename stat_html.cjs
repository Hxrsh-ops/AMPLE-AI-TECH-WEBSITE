const fs = require('fs');
const cheerio = require('cheerio');
function getStat(f) {
  const html = fs.readFileSync(f, 'utf8');
  const $ = cheerio.load(html);
  return $('section#stat').html().substring(0, 300);
}
console.log('about-us.html:', getStat('about-us.html'));
console.log('index.html:', getStat('index.html'));
