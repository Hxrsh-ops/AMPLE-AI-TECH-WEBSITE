const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const stats = $('.framer-1v6c2xt');
console.log("Stats container exists:", stats.length);

stats.children().each((i, c) => {
  console.log(`${i}: ${c.tagName} class="${$(c).attr('class')}" name="${$(c).attr('data-framer-name')}"`);
  
  $(c).children().each((j, cc) => {
    console.log(`  ${i}.${j}: ${cc.tagName} class="${$(cc).attr('class')}" name="${$(cc).attr('data-framer-name')}" style="${$(cc).attr('style')}"`);
    
    $(cc).children().each((k, ccc) => {
      console.log(`    ${i}.${j}.${k}: ${ccc.tagName} class="${$(ccc).attr('class')}" name="${$(ccc).attr('data-framer-name')}" text="${$(ccc).text().trim().substring(0, 50).replace(/\s+/g, ' ')}"`);
    });
  });
});
