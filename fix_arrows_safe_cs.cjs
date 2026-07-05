const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('case-studies.html', 'utf8');
const $ = cheerio.load(html);

const arrowSrc = 'https://framerusercontent.com/images/RspHl7rxQnqaCOgzBcVlgXDmw.svg';

$('*:contains("Lead Follow-Up Automation")').each(function() {
    if ($(this).children().length === 0) {
        let tile = $(this).closest('a');
        if (tile.length) {
            tile.find('img').each(function() {
                if ($(this).attr('src') && !$(this).attr('src').includes('case-study-realestate')) {
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

fs.writeFileSync('case-studies.html', $.html());
console.log("Fixed arrows safely in case-studies.html");
