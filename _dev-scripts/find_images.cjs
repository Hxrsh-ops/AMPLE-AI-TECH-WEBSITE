const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);
let srcs = new Set();
$('#case-studies img').each((i, el) => {
    srcs.add($(el).attr('src'));
});
console.log(Array.from(srcs));
