import fs from 'fs';
import * as cheerio from 'cheerio';

const content = fs.readFileSync('case-studies/dental-clinic-voice-receptionist.html', 'utf8');
const $ = cheerio.load(content);

console.log($('.framer-19f1k82').html().substring(0, 1000));
console.log($('.framer-19f1k82').html().substring(1000, 2000));
