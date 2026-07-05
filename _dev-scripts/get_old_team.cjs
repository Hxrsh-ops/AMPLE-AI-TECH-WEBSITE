const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('temp_repo/index.html', 'utf8');
const $ = cheerio.load(html);

const teamSection = $('section[data-framer-name="Team"]');
console.log(teamSection.html().substring(0, 1500));
