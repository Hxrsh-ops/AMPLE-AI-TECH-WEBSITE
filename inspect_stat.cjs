const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const stat = $('section[data-framer-name="Stat"]');
console.log(stat.html().substring(0, 300));
