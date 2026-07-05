const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const child5 = $('.framer-fjvt37 > div').eq(4); // Child 5

// Let's print the top elements under Child 5:
console.log("=== Top elements of Child 5 ===");
child5.children().each((i, c) => {
  console.log(`${i}: ${c.tagName} class="${$(c).attr('class')}" name="${$(c).attr('data-framer-name')}"`);
  
  // Go one level deeper
  $(c).children().each((j, cc) => {
    console.log(`  ${i}.${j}: ${cc.tagName} class="${$(cc).attr('class')}" name="${$(cc).attr('data-framer-name')}"`);
    
    // Go another level deeper
    $(cc).children().each((k, ccc) => {
      console.log(`    ${i}.${j}.${k}: ${ccc.tagName} class="${$(ccc).attr('class')}" name="${$(ccc).attr('data-framer-name')}"`);
      
      $(ccc).children().each((l, cccc) => {
        console.log(`      ${i}.${j}.${k}.${l}: ${cccc.tagName} class="${$(cccc).attr('class')}" name="${$(cccc).attr('data-framer-name')}"`);
      });
    });
  });
});
