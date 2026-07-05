const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('index.html', 'utf8');
let $ = cheerio.load(html);

// Find all arrows we messed up and remove the invert filter
$('img[src*="RspHl7rxQnqaCOgzBcVlgXDmw.svg"]').each(function() {
    let style = $(this).attr('style');
    if (style && style.includes('invert(1)')) {
        $(this).attr('style', style.replace('filter: invert(1);', '').replace('filter:invert(1);', ''));
    }
});

fs.writeFileSync('index.html', $.html());

html = fs.readFileSync('case-studies.html', 'utf8');
$ = cheerio.load(html);
$('img[src*="RspHl7rxQnqaCOgzBcVlgXDmw.svg"]').each(function() {
    let style = $(this).attr('style');
    if (style && style.includes('invert(1)')) {
        $(this).attr('style', style.replace('filter: invert(1);', '').replace('filter:invert(1);', ''));
    }
});
fs.writeFileSync('case-studies.html', $.html());

console.log("Removed invert filter");
