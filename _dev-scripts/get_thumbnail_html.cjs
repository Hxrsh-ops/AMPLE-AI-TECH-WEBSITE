const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('about-us.html', 'utf8');
const $ = cheerio.load(html);

const teamSection = $('section[data-framer-name="Team"]');
let thumb = teamSection.find('div[data-framer-name="Thumbnail"]').first();
console.log(thumb.parent().html().substring(0, 500));
console.log("----");
console.log(thumb.html().substring(0, 500));
