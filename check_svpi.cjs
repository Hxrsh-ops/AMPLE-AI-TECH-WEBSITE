const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

$('img[src*="SVpiB8hg7Q5zZKU3C5LOIio708o.png"]').each((i, el) => {
    console.log("Found SVpi...png");
    console.log($(el).parent().parent().parent().html().substring(0,200));
});
