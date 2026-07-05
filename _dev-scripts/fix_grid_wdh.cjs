const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const wdh = $('#why-delay-hurts');
if (wdh.length > 0) {
  // Remove the wdh-grid we added previously
  wdh.find('.wdh-grid').remove();
  wdh.find('.wdh-grid-line').remove();
  
  // ensure the wdh-container doesn't have an artificial grid
  
  fs.writeFileSync('index.html', $.html());
  console.log("Removed custom wdh grid to respect site borders");
}
