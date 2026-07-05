const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const wdh = $('#why-delay-hurts');
if (wdh.length > 0) {
  const cssUpdate = `
    .wdh-row-left span.text strong { font-weight: 800; color: #ffffff; }
    .wdh-row-left span.text { font-weight: 400; color: #a3a3a3; }
  `;
  wdh.find('style').append(cssUpdate);

  const rows = wdh.find('.wdh-row-left span.text');
  if (rows.length === 4) {
    $(rows[0]).html('OPERATIONAL TASKS <strong>STAY MANUAL</strong>');
    $(rows[1]).html('COMPETITORS <strong>MOVE FASTER</strong>');
    $(rows[2]).html('MISSED <strong>AUTOMATION OPPORTUNITIES</strong>');
    $(rows[3]).html('TIME WASTED ON <strong>REPETITIVE WORK</strong>');
  }

  fs.writeFileSync('index.html', $.html());
  console.log("Patched text weights.");
}
