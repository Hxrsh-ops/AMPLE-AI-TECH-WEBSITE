const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('case-studies.html', 'utf8');
const $ = cheerio.load(html);

console.log($('img').map((i, el) => $(el).attr('src')).get().join('\n'));
