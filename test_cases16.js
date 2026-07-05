import fs from 'fs';
import * as cheerio from 'cheerio';

const content = fs.readFileSync('case-studies/dental-clinic-voice-receptionist.html', 'utf8');
const $ = cheerio.load(content);

console.log($('.framer-1na40bo-container').first().find('.framer-8rbnoz-container').length);
console.log($('.framer-dgkres-container').first().find('.framer-8rbnoz-container').length);
