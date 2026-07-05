const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('case-studies.html', 'utf8');
const $ = cheerio.load(html);

const arrowSrc = 'https://framerusercontent.com/images/RspHl7rxQnqaCOgzBcVlgXDmw.svg';

console.log($('section').map((i, el) => $(el).attr('data-framer-name')).get().join(', '));
let count = 0;

// let's just find ALL images in case-studies.html that look like small thumbnails in rows
$('a').each(function(i) {
    let img = $(this).find('img');
    if (img.length === 1) { // Single image inside link
        // let's check its size or src
        let src = img.attr('src');
        if (src && !src.includes(arrowSrc) && img.attr('width') && parseInt(img.attr('width')) < 200) {
            console.log("Found image to replace:", src);
            img.removeAttr('srcset');
            img.removeAttr('sizes');
            img.attr('src', arrowSrc);
            img.css('object-fit', 'contain');
            img.css('width', '14px');
            img.css('height', '14px');
            img.parent().css('display', 'flex');
            img.parent().css('align-items', 'center');
            img.parent().css('justify-content', 'center');
            count++;
        }
    }
});
console.log("Replaced", count, "in case-studies.html");
fs.writeFileSync('case-studies.html', $.html());
