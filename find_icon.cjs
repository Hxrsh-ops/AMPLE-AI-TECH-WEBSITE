const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('case-studies.html', 'utf8');
const $ = cheerio.load(html);

console.log($('*:contains("Dental Clinic Voice Receptionist")').last().parent().parent().parent().html());
