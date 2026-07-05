const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('case-studies.html', 'utf8');
const $ = cheerio.load(html);

$('h3').each(function() {
    console.log("h3:", $(this).text());
});
