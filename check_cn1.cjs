const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

let el = $('img[src*="Cn1OOIpbgXPpuhkokr96OPS62c.svg"]');
if (el.length > 0) {
    console.log("Found Cn1...svg");
    console.log(el.parent().parent().parent().html());
} else {
    console.log("Not found in index.html");
}
