const fs = require('fs');
const cheerio = require('cheerio');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(html);
  $('[id]').each((i, el) => {
    const id = $(el).attr('id');
    if (id.includes('case')) {
      console.log(`File: ${file}, ID: ${id}, Tag: ${el.tagName}`);
    }
  });
}
