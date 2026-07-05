const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);
let srcs = new Set();
$('img').each((i, el) => {
    let src = $(el).attr('src');
    if(src && src.includes('framerusercontent.com/images')) {
        srcs.add(src);
    }
});
console.log(Array.from(srcs));
