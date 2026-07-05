import fs from 'fs';
import * as cheerio from 'cheerio';

const content = fs.readFileSync('case-studies/ecommerce-support-assistant.html', 'utf8');
const $ = cheerio.load(content);

console.log($('.framer-ve67mk-container').length);
console.log($('.framer-1na40bo-container').length);
console.log($('.framer-dgkres-container').length);
