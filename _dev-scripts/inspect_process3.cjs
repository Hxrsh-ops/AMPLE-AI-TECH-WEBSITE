const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const pNode = $('[data-framer-name="FAQ"]');
if (pNode.length) {
  console.log(pNode.html().substring(0, 300));
} else {
  console.log("Not found.");
}
