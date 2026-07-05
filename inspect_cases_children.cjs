const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const casesWrap = $('section[data-framer-name="Cases"] > div[data-framer-name="Wrap"]');
console.log("Cases wrap exists:", casesWrap.length);

casesWrap.children().each((i, child) => {
  const tagName = child.tagName;
  const id = $(child).attr('id') || '';
  const cl = $(child).attr('class') || '';
  const name = $(child).attr('data-framer-name') || '';
  console.log(`Child ${i+1}: ${tagName}#${id}.${cl.split(' ').join('.')} [name="${name}"]`);
});
