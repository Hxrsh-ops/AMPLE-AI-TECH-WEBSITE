const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

$('*:contains("Lead Follow-Up Automation")').each(function() {
    if ($(this).children().length === 0) {
        let tile = $(this).closest('a');
        if (tile.length) {
            console.log("Found Tile images:");
            tile.find('img').each(function() {
                console.log($(this).attr('src'), $(this).attr('style'));
            });
            console.log('---');
        }
    }
});
