const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('about-us.html', 'utf8');
const $ = cheerio.load(html);
const stat = $('section#stat');
stat.find('p').each((i, el) => {
    if ($(el).text().includes('smarter decisions') || $(el).text().includes('satisfaction')) {
        console.log(`p html in about-us.html:`, $(el).html());
    }
});
