const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

console.log("=== Analysing elements shown on Phone ===");

// Find all elements visible on phone (not having hidden-72rtr7)
$('*').each((i, el) => {
  const cl = $(el).attr('class') || '';
  const style = $(el).attr('style') || '';
  const name = $(el).attr('data-framer-name') || '';
  const id = $(el).attr('id') || '';
  
  // If parent is hidden, this element is hidden. Let's just look at some major containers
  if ($(el).parents('.hidden-72rtr7').length > 0) {
    return;
  }
  if (cl.includes('hidden-72rtr7')) {
    return;
  }
  
  // Let's filter to elements under Services/Cases
  const underServicesCases = $(el).parents('[data-framer-name="Services/Cases"]').length > 0 || $(el).attr('data-framer-name') === 'Services/Cases';
  if (!underServicesCases) return;
  
  // Check if it's a div, section, or a with specific height, margin or padding style
  if (style.includes('height') || style.includes('margin') || style.includes('padding') || cl.includes('ample')) {
    console.log(`Element: ${el.tagName}#${id}.${cl.split(' ').join('.')} [name="${name}"] style="${style}"`);
  }
});
