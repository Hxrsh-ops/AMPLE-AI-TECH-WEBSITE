const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const main = $('main[data-framer-name="Main"]');
main.children().each((i, el) => {
  console.log($(el).get(0).tagName, "class:", $(el).attr('class'), "data-framer-name:", $(el).attr('data-framer-name'));
});
