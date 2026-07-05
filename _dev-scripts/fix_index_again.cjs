const fs = require('fs');
const cheerio = require('cheerio');

// we need to re-apply the text color change to the wdh-title
let html = fs.readFileSync('index.html', 'utf8');

// The CSS style for .wdh-title was changed
html = html.replace('.wdh-title { font-size: clamp(40px, 6vw, 72px); line-height: 1.05; font-weight: 700; max-width: 900px; letter-spacing: -0.03em; margin: 0; }', '.wdh-title { color: #ffffff; font-size: clamp(40px, 6vw, 72px); line-height: 1.05; font-weight: 700; max-width: 900px; letter-spacing: -0.03em; margin: 0; }');

// We also replaced some arrows in index.html specifically.
const $ = cheerio.load(html);

// Now let's carefully replace the arrow on the case study tiles
// The user says "add the same arrow for the navigation as in the ai voice receptionist case study tile"
// So there are case study tiles: Lead Follow-up Automation, AI Support Assistant MVP, etc.
// The Voice Receptionist tile has an arrow: https://framerusercontent.com/images/RspHl7rxQnqaCOgzBcVlgXDmw.svg
const arrowSrc = 'https://framerusercontent.com/images/RspHl7rxQnqaCOgzBcVlgXDmw.svg';

$('*:contains("Lead Follow-Up Automation")').each(function() {
    if ($(this).children().length === 0) {
        let tile = $(this).closest('a');
        if (tile.length) {
            // Find the small image inside this tile that is likely the house or shoe
            // The structure is roughly tile -> image -> image -> image etc. 
            // The one to replace is the small navigation icon which might be width="14" or so
            tile.find('img').each(function() {
                if ($(this).attr('src') && !$(this).attr('src').includes('case-study-realestate')) {
                    // Let's replace it
                    $(this).removeAttr('srcset');
                    $(this).removeAttr('sizes');
                    $(this).attr('src', arrowSrc);
                    $(this).attr('width', '14');
                    $(this).attr('height', '14');
                    $(this).css({
                        'width': '14px',
                        'height': '14px',
                        'object-fit': 'contain'
                    });
                }
            });
        }
    }
});

$('*:contains("AI Support Assistant MVP")').each(function() {
    if ($(this).children().length === 0) {
        let tile = $(this).closest('a');
        if (tile.length) {
            tile.find('img').each(function() {
                if ($(this).attr('src') && !$(this).attr('src').includes('case-study-ecommerce')) {
                    $(this).removeAttr('srcset');
                    $(this).removeAttr('sizes');
                    $(this).attr('src', arrowSrc);
                    $(this).attr('width', '14');
                    $(this).attr('height', '14');
                    $(this).css({
                        'width': '14px',
                        'height': '14px',
                        'object-fit': 'contain'
                    });
                }
            });
        }
    }
});

fs.writeFileSync('index.html', $.html());
