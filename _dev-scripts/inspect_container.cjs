const fs = require('fs');
const cheerio = require('cheerio');

const content = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(content);

console.log("=== PARENT CONTAINER STRUCTURE ===");
const container = $('.framer-1spe2co');
if (container.length > 0) {
    console.log(`Found ${container.length} containers with class .framer-1spe2co`);
    container.each((i, el) => {
        console.log(`--- Container ${i} ---`);
        // Let's print out the classes and the full inner HTML structure simplified (just tags, text, and classes)
        function printSimplified(element, depth = 0) {
            const indent = '  '.repeat(depth);
            const tagName = element.tagName;
            if (!tagName) return;
            const cls = $(element).attr('class') || '';
            const dataName = $(element).attr('data-framer-name') || '';
            const style = $(element).attr('style') || '';
            const text = $(element).clone().children().remove().end().text().trim();
            console.log(`${indent}<${tagName} class="${cls}" data-framer-name="${dataName}" style="${style.substring(0, 80)}..."> ${text}`);
            $(element).children().each((idx, child) => {
                printSimplified(child, depth + 1);
            });
        }
        printSimplified(el);
    });
} else {
    console.log("Container .framer-1spe2co not found.");
}
