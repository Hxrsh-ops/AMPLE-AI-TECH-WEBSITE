const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const child5 = $('.framer-fjvt37 > div').eq(4); // the 5th child
console.log("Child 5 classes:", child5.attr('class'));

function logChildrenDetailed(el, indent) {
  $(el).children().each((i, child) => {
    const tagName = child.tagName;
    const cl = $(child).attr('class') || '';
    const name = $(child).attr('data-framer-name') || '';
    const style = $(child).attr('style') || '';
    const id = $(child).attr('id') || '';
    console.log(`${indent}${tagName}#${id}.${cl.split(' ').join('.')} [name="${name}"] style="${style}" text="${$(child).text().trim().substring(0, 40).replace(/\s+/g, ' ')}"`);
    logChildrenDetailed(child, indent + '  ');
  });
}

logChildrenDetailed(child5, '  ');
