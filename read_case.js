import fs from 'fs';
import * as cheerio from 'cheerio';

const content = fs.readFileSync('case-studies/dental-clinic-voice-receptionist.html', 'utf8');
const $ = cheerio.load(content);

console.log("swwr6r:", $('.framer-swwr6r-container').text().substring(0, 50));
console.log("1jfhltq:", $('.framer-1jfhltq-container').text().substring(0, 50));
console.log("zgu289:", $('.framer-zgu289-container').text().substring(0, 50));
