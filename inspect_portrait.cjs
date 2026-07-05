const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('about-us.html', 'utf8');
const $ = cheerio.load(html);

const teamSection = $('section[data-framer-name="Team"]');
let img = teamSection.find('img[width="800"]').first();

let parent = img.parent();
for(let i=0; i<4; i++) {
    console.log(parent.get(0).tagName, parent.attr('class'), parent.attr('data-framer-name'), parent.attr('style'));
    parent = parent.parent();
}

