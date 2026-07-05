const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('about-us.html', 'utf8');
const $ = cheerio.load(html);

const teamSection = $('section[data-framer-name="Team"]');
let thumb = teamSection.find('div[data-framer-name="Thumbnail"]').first();
console.log("Thumbnail siblings:", thumb.siblings().map((i, el) => $(el).attr('data-framer-name')).get());
console.log("Thumbnail parent siblings:", thumb.parent().siblings().map((i, el) => $(el).attr('data-framer-name')).get());
console.log("Thumbnail grandparent siblings:", thumb.parent().parent().siblings().map((i, el) => $(el).attr('data-framer-name')).get());
