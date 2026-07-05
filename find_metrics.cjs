const fs = require('fs');
const cheerio = require('cheerio');

const content = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(content);

console.log("=== SEARCHING METRICS ===");
$('*').each((i, el) => {
    const text = $(el).text();
    if (text.includes("Faster AI execution") || text.includes("Reliable system uptime") || text.includes("Businesses supported")) {
        // If this is the lowest level element containing it
        if ($(el).children().length === 0 || !$(el).html().includes("Faster AI execution")) {
            console.log(`Tag: ${el.name}, Class: ${$(el).attr('class') || 'none'}, Name: ${$(el).attr('data-framer-name') || 'none'}`);
            console.log(`Parent: ${$(el).parent().prop('tagName')}, ParentClass: ${$(el).parent().attr('class')}`);
            console.log(`HTML: ${$.html(el).substring(0, 400)}`);
            console.log("-----------------------------------------");
        }
    }
});
