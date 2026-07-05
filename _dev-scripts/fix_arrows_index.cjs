const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const arrowSrc = 'https://framerusercontent.com/images/RspHl7rxQnqaCOgzBcVlgXDmw.svg';
let count = 0;

// Find ALL small images inside the Services/Cases or Case Studies sections
$('[data-framer-name="Services/Cases"] a, section#case-studies a').each(function() {
    let text = $(this).text().trim();
    let img = $(this).find('img').first();
    if (img.length) {
        let src = img.attr('src') || '';
        // If it's a small image that isn't the arrow
        // The images to replace are shoes and house, they are likely width 14 or so, or maybe their src doesn't match arrow
        if (!src.includes('RspHl7rx') && !src.includes('xKyRo384') && !src.includes('P1o1pZtb') && !src.includes('cxHtoSVk')) {
            console.log("Replacing image for:", text.substring(0, 30), src);
            img.removeAttr('srcset');
            img.removeAttr('sizes');
            img.attr('src', arrowSrc);
            img.css('object-fit', 'contain');
            img.css('width', '14px');
            img.css('height', '14px');
            img.css('filter', 'invert(1)'); // The arrow might be black, let's invert it just in case? Or the arrow was white
            count++;
        }
    }
});

console.log("Replaced", count, "in index.html");
fs.writeFileSync('index.html', $.html());
