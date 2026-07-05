const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('about-us.html', 'utf8');
const $ = cheerio.load(html);

$('*:contains("Deon")').each(function() {
    if ($(this).children().length === 0) {
        console.log("Text containing Deon:", $(this).text());
        // Find the image in this card
        let parent = $(this).parents().eq(5); // Guessing the card depth
        let img = parent.find('img');
        console.log("Images in this sub-tree:", img.length);
        if (img.length > 0) {
             console.log("First image src:", img.eq(0).attr('src'));
             // Also let's print out the class of the image wrapper so we can target it.
             let imgWrapper = img.eq(0).parent();
             console.log("Img wrapper classes:", imgWrapper.attr('class'));
             // The outer wrapper that we might want to replace
             console.log("Outer img container classes:", imgWrapper.parent().attr('class'), imgWrapper.parent().attr('data-framer-name'));
        }
    }
});
