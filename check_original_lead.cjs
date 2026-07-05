const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('temp_repo/index.html', 'utf8');
const $ = cheerio.load(html);

$('*:contains("Lead Follow-Up Automation")').each(function() {
    if ($(this).children().length === 0) {
        let tile = $(this).closest('a');
        if (tile.length) {
            let container = tile.find('div[data-framer-name="Image"]').parent();
            console.log(container.html());
        }
    }
});
