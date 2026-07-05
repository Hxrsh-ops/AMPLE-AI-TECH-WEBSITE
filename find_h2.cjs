const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

$('h2').each((i, el) => {
    console.log("h2:", $(el).text().substring(0, 50));
});
