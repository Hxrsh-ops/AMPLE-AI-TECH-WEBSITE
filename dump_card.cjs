const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find the first case study card
let card = $('a[href*="/case-studies/"]').first();
// Dump its entire HTML nicely formatted
console.log(card.html());
