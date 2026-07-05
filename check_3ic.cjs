const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

let el = $('img[src*="3icLKLq4WZTbVhxinPfnmBhrA.png"]');
if (el.length > 0) {
    console.log("Found 3ic...png");
    console.log(el.parent().parent().parent().html());
}
