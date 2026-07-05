const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

$('section').each(function() {
    console.log("section id:", $(this).attr('id'), "data-framer-name:", $(this).attr('data-framer-name'), "class:", $(this).attr('class'));
});
