const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

$('img[src="/assets/case-study-dental.png"]').each((i, el) => {
    let parent = $(el).parent().parent().parent();
    // find all images in this block
    let imgs = parent.find('img').map((i, e) => $(e).attr('src')).get();
    console.log("Images near case-study-dental:", imgs);
});
