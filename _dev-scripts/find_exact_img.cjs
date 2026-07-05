const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const selector = 'div#main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > main:nth-of-type(1) > div:nth-of-type(2) > section#case-studies:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(6) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(6) > div:nth-of-type(2) > div:nth-of-type(1) > img:nth-of-type(1)';

// Cheerio might not support nth-of-type perfectly, let's use a simpler approach or just try:
try {
    let el = $(selector);
    console.log("Found by exact selector:", el.attr('src'));
} catch (e) {
    console.log("Selector error");
}

// Alternative: let's just log the 6th div in case-studies
let caseStudies = $('#case-studies');
console.log("case-studies exists:", caseStudies.length);
