const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

$('a[href*="/case-studies/"]').first().find('svg').each((i, el) => {
    console.log("Found inline SVG:", $.html(el).substring(0, 200));
});
