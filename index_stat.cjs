const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find the stat section
const stat = $('section#stat');
const tiles = stat.find('.framer-cmyx3u-container, .framer-cgkpF.framer-dQc7B'); // Just try to find elements with text "50+"
console.log('Found 50+ in index.html:', stat.text().includes('50+'));
console.log('Found 99% in index.html:', stat.text().includes('99%'));

stat.find('p').each((i, el) => {
    if ($(el).text().includes('smarter decisions') || $(el).text().includes('satisfaction')) {
        console.log(`p text in index.html:`, $(el).text());
        console.log(`p html in index.html:`, $(el).html());
    }
});

