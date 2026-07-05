const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

let card = $('a[href*="/case-studies/"]').first();
let bgs = [];
card.find('*').each((i, el) => {
    let style = $(el).attr('style');
    if(style && style.includes('url(')) {
        bgs.push(style);
    }
});
console.log("Backgrounds:", bgs);
