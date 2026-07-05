const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

$('*:contains("Voice Receptionist")').each(function() {
    if ($(this).children().length === 0) {
        let parent = $(this).parents().eq(4);
        let img = parent.find('img');
        if (img.length > 0) {
            img.each(function() {
               console.log("Image:", $(this).attr('src'), "w:", $(this).attr('width'));
            });
        }
    }
});
