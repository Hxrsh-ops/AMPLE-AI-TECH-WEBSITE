const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const wrapChildren = $('.framer-fjvt37').children();

wrapChildren.each((i, el) => {
  const cl = $(el).attr('class') || '';
  if (cl.includes('hidden-72rtr7')) {
    console.log(`Child ${i+1}: Hidden on Phone`);
    return;
  }
  console.log(`Child ${i+1}: Visible on Phone! class="${cl}"`);
  console.log(`   Short Text: "${$(el).text().trim().substring(0, 100).replace(/\s+/g, ' ')}"`);
  
  // Let's list immediate children
  $(el).children().each((j, child) => {
    const childCl = $(child).attr('class') || '';
    const childName = $(child).attr('data-framer-name') || '';
    console.log(`     Sub-child ${j+1}: ${child.tagName} class="${childCl}" name="${childName}"`);
  });
});
