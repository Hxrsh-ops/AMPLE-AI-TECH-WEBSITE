const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const wdh = $('#why-delay-hurts');
if (wdh.length > 0) {
  // Wrap inner content
  const innerHtml = wdh.html();
  wdh.empty();
  
  wdh.removeAttr('style');
  wdh.attr('class', 'framer-324egz');
  // keep id="why-delay-hurts"
  
  const innerWrapper = $('<div class="framer-a7hzml" data-border="true" data-framer-name="Wrap" style="width: 100%; position: relative; overflow: hidden; max-width: 1920px; z-index: 1;"></div>');
  innerWrapper.append(innerHtml);
  wdh.append(innerWrapper);

  fs.writeFileSync('index.html', $.html());
  console.log("Fixed grid");
} else {
  console.log("Section not found");
}
