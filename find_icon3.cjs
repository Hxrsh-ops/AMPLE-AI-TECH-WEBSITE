const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

$('*:contains("Voice Receptionist")').each(function() {
    if ($(this).children().length === 0) {
        console.log("Text containing Voice Receptionist:", $(this).text());
        // Find the image in this card
        let parent = $(this).parents().eq(4); // Guessing the card depth
        let img = parent.find('img');
        console.log("Images in this sub-tree:", img.length);
        if (img.length > 0) {
             console.log("First image src:", img.eq(0).attr('src'));
        }
        console.log("HTML:", parent.html() ? parent.html().substring(0, 500) : "");
    }
});
