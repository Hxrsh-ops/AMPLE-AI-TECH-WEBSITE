const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('about-us.html', 'utf8');
const $ = cheerio.load(html);

const teamSection = $('section[data-framer-name="Team"]');
let thumbs = teamSection.find('div[data-framer-name="Thumbnail"]');
console.log("Found Thumbnails:", thumbs.length);

