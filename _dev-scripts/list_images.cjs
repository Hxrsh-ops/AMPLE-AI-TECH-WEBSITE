const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('about-us.html', 'utf8');
const $ = cheerio.load(html);

const teamSection = $('section[data-framer-name="Team"]');
teamSection.find('img').each(function() {
    let src = $(this).attr('src');
    let width = $(this).attr('width');
    let height = $(this).attr('height');
    console.log(`Image w:${width} h:${height} src:${src.substring(0,60)}...`);
});
