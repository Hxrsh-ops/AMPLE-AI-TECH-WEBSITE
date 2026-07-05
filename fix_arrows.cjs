const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// We need to replace the small thumbnail images in the case study list with the arrow icon
// The arrow icon is: https://framerusercontent.com/images/RspHl7rxQnqaCOgzBcVlgXDmw.svg
const arrowSrc = 'https://framerusercontent.com/images/RspHl7rxQnqaCOgzBcVlgXDmw.svg';

const cs = $('section#case-studies');
if (cs.length) {
    console.log("Found case studies section");
    // Find rows. Let's find images in these specific rows that are not the arrow
    cs.find('a').each(function(i) {
        let text = $(this).text().trim();
        let img = $(this).find('img').first();
        if (img.length) {
            console.log(`Link text: ${text.substring(0, 30)}, img: ${img.attr('src')}`);
            // If it's a thumbnail (e.g. shoes, house, not the arrow) we replace it
            if (img.attr('src') !== arrowSrc) {
                // The thumbnail might have srcset, remove it
                img.removeAttr('srcset');
                img.removeAttr('sizes');
                img.attr('src', arrowSrc);
                img.css('object-fit', 'contain');
                img.css('width', '14px');
                img.css('height', '14px');
                // Make the parent container center the icon properly
                img.parent().css('display', 'flex');
                img.parent().css('align-items', 'center');
                img.parent().css('justify-content', 'center');
                
                // Let's also remove any width/height wrappers if needed
            }
        }
    });
} else {
    console.log("Not found case studies section");
}

fs.writeFileSync('index.html', $.html());
