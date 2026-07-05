import fs from 'fs';
import * as cheerio from 'cheerio';

const content = fs.readFileSync('case-studies/dental-clinic-voice-receptionist.html', 'utf8');
const $ = cheerio.load(content);

console.log("Looking for metric boxes:");
$('.framer-6d7zul').each((i, el) => {
    console.log("Container", i);
    console.log($(el).text());
});
