const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('about-us.html', 'utf8');
const $ = cheerio.load(html);
const tiles = $('div#main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > main:nth-of-type(1) > section#stat:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div');
console.log('Total tiles:', tiles.length);
tiles.each((i, el) => {
    console.log(`Tile ${i+1} html:`, $(el).html().substring(0, 500));
});
