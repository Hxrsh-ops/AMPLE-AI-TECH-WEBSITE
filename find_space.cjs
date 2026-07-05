const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find the parent element of the "Get started now" text
const getStarted = $('p:contains("Get started now")');
console.log("Found getStarted p tags:", getStarted.length);

getStarted.each((i, el) => {
  console.log(`P element ${i+1}:`);
  let parent = $(el).parent();
  let depth = 0;
  while (parent.length && depth < 10) {
    const tagName = parent[0].tagName;
    const id = parent.attr('id') || '';
    const cl = parent.attr('class') || '';
    const name = parent.attr('data-framer-name') || '';
    console.log(`  Parent ${depth+1}: ${tagName}#${id}.${cl.split(' ').join('.')} [name="${name}"]`);
    parent = parent.parent();
    depth++;
  }
});
