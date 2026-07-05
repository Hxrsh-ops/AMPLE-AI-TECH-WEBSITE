const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);
const selector = 'div#main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > main:nth-of-type(1) > section#stat:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > p:nth-of-type(1)';
const target = $(selector);
console.log('Index target:', target.length);
if (target.length) console.log('Text:', target.text(), 'Style:', target.attr('style'));

const about = fs.readFileSync('about-us.html', 'utf8');
const $about = cheerio.load(about);
const tAbout = $about(selector);
console.log('About target:', tAbout.length);
if (tAbout.length) console.log('Text:', tAbout.text(), 'Style:', tAbout.attr('style'));
