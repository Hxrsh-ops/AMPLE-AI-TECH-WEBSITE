import fs from 'fs';
import * as cheerio from 'cheerio';

const content = fs.readFileSync('case-studies/dental-clinic-voice-receptionist.html', 'utf8');
const $ = cheerio.load(content);

console.log($('.framer-6d7zul').html().substring(3000, 4000));
console.log($('.framer-6d7zul').html().substring(4000, 5000));
console.log($('.framer-6d7zul').html().substring(5000, 6000));
