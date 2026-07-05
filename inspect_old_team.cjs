const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('temp_repo/index.html', 'utf8');
const $ = cheerio.load(html);

const teamSection = $('section[data-framer-name="Team"]');
console.log("Team section classes:", teamSection.attr('class'));
console.log("Team section style:", teamSection.attr('style'));
console.log("Team section borders:", teamSection.attr('data-border'));
console.log("Team section parent node:", teamSection.parent().get(0).tagName, "classes:", teamSection.parent().attr('class'));
