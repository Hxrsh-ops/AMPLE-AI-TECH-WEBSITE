const fs = require('fs');
const cheerio = require('cheerio');
const file = 'about-us.html';
const html = fs.readFileSync(file, 'utf8');
const $ = cheerio.load(html);
const selector = 'div#main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > main:nth-of-type(1) > section#stat:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > p:nth-of-type(1)';

const target = $(selector);
if (target.length) {
    let style = target.attr('style') || '';
    
    // Remove existing padding/margin to avoid duplicates
    style = style.replace(/padding-top:\s*[^;]+;?/g, '');
    style = style.replace(/margin-top:\s*[^;]+;?/g, '');
    style = style.replace(/margin-bottom:\s*[^;]+;?/g, '');
    
    // Append the new styles
    style = style.trim();
    if (style.length > 0 && !style.endsWith(';')) style += '; ';
    else if (style.length > 0) style += ' ';
    
    style += 'padding-top: 6px; margin-top: 0px; margin-bottom: 25px;';
    
    target.attr('style', style);
    
    fs.writeFileSync(file, $.html());
    console.log('Patched', file);
} else {
    console.log('Target not found in', file);
}
