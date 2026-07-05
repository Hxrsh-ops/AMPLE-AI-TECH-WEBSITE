const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

$('a[href*="/case-studies/"]').each((i, el) => {
    console.log("Card", i);
    $(el).find('img').each((j, img) => {
        console.log("  img:", $(img).attr('src'));
    });
});
