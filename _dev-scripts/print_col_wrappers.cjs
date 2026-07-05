const fs = require('fs');
const cheerio = require('cheerio');

const content = fs.readFileSync('about-us.html', 'utf8');
const $ = cheerio.load(content);

const cols = [
    { name: 'Col 1 (5X)', sel: '.framer-pw673' },
    { name: 'Col 2 (5+)', sel: '.framer-1bzr4nu' },
    { name: 'Col 3 (99%)', sel: '.framer-1jeik2n' },
    { name: 'Col 4 (50+)', sel: '.framer-evw9i6' },
    { name: 'Col 5 (98%)', sel: '.framer-1q3dow0' }
];

cols.forEach(item => {
    const el = $(item.sel).first();
    console.log(`\n=== ${item.name} ===`);
    console.log(`Tag: ${el.prop('tagName')}`);
    console.log(`Class: ${el.attr('class')}`);
    console.log(`Style: ${el.attr('style') || 'none'}`);
    console.log(`OuterHTML prefix: ${$.html(el).substring(0, 300)}`);
});
