const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const cs = $('section#case-studies');
if (cs.length) {
    console.log("Found case studies section. looking for a tags with arrows.");
    cs.find('a').each(function(i) {
        let text = $(this).text().replace(/\s+/g, ' ').substring(0, 50);
        let img = $(this).find('img').first();
        console.log(`Link ${i}: text: ${text}, img: ${img.attr('src')}`);
    });
}
