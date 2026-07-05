const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const container = $('.framer-59ra2k');
console.log("Container name:", container.attr('data-framer-name'), "class:", container.attr('class'));

container.children().each((i, e) => {
  const tagName = e.tagName;
  const id = $(e).attr('id') || '';
  const cl = $(e).attr('class') || '';
  const name = $(e).attr('data-framer-name') || '';
  console.log(`Child ${i+1}: ${tagName}#${id}.${cl.split(' ').join('.')} [name="${name}"]`);
});
