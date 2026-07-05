const fs = require('fs');
const cheerio = require('cheerio');
const files = ['index.html', 'about-us.html'];

files.forEach(f => {
    const html = fs.readFileSync(f, 'utf8');
    const $ = cheerio.load(html);
    const target1 = $('div#main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > main:nth-of-type(1) > section#team:nth-of-type(4) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > img:nth-of-type(1)');
    const target2 = $('div#main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > main:nth-of-type(1) > section#team:nth-of-type(4) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(5) > div:nth-of-type(1)');
    console.log(f, 'target1 found:', target1.length, 'target2 found:', target2.length);
});
