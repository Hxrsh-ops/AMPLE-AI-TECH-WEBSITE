const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const servicesSection = $('section.framer-1915etu');
console.log("Services section exists:", servicesSection.length);

const wrap = servicesSection.find('.framer-fjvt37');
console.log("Wrap container exists:", wrap.length);

wrap.children().each((i, child) => {
  const cl = $(child).attr('class') || '';
  const name = $(child).attr('data-framer-name') || '';
  console.log(`Child ${i+1}: ${child.tagName} class="${cl}" name="${name}"`);
});
