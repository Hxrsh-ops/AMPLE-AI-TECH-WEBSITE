const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('about-us.html', 'utf8');
const $ = cheerio.load(html);

const teamSection = $('section[data-framer-name="Team"]');
let splitDesktop = teamSection.find('.framer-2OEn5.framer-rakjc').first(); // 'Split - Desktop'
console.log("Desktop block:", splitDesktop.length);

console.log(splitDesktop.html().substring(0, 1500));
