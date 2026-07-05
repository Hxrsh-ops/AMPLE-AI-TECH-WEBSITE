import fs from 'fs';
import * as cheerio from 'cheerio';

const content = fs.readFileSync('case-studies/dental-clinic-voice-receptionist.html', 'utf8');
const $ = cheerio.load(content);

console.log($('.framer-ve67mk-container').first().html().match(/.{0,50}Automated response.{0,50}/g));
