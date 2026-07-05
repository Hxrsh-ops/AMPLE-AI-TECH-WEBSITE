const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find the section that contains "Cases" or "CASE STUDIES"
let caseSection = $('section').filter((i, el) => {
    let text = $(el).text();
    return text.includes('Cases') || text.includes('CASE STUDIES') || text.includes('Case Studies');
}).first();

console.log("Section ID:", caseSection.attr('id'));
console.log("Section class:", caseSection.attr('class'));

// Now find the 6th div inside its first div
let div1 = caseSection.children('div').eq(0);
let div6 = div1.children('div').eq(5); // 0-indexed, so 5 is 6th
console.log("Div 6 class:", div6.attr('class'));

let img = div6.find('img').first();
console.log("Found img:", img.attr('src'));
