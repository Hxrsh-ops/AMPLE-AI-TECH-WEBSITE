const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// We will find all img elements and check their parents' structure
let imgs = $('img');
imgs.each((i, el) => {
    let src = $(el).attr('src');
    if(src && src.includes('RspHl7rx')) return; // ignore arrow
    if(src && src.includes('case-study-dental')) return; // ignore main image

    let current = $(el);
    let path = [];
    while(current.length && current.prop('tagName')) {
        let tag = current.prop('tagName').toLowerCase();
        let id = current.attr('id');
        path.unshift(tag + (id ? '#' + id : ''));
        current = current.parent();
    }
    let pathStr = path.join(' > ');
    if(pathStr.includes('case-studies')) {
        console.log("Found in case-studies:", src);
    }
});

// Let's just find element by ID case-studies
let cs = $('[id="case-studies"]');
console.log("Elements with id case-studies:", cs.length);
if (cs.length > 0) {
    let cs_imgs = cs.find('img').map((i, e) => $(e).attr('src')).get();
    console.log("Images inside #case-studies:", cs_imgs);
}
