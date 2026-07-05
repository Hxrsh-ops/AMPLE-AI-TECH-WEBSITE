import fs from 'fs';
import * as cheerio from 'cheerio';

const content = fs.readFileSync('case-studies/dental-clinic-voice-receptionist.html', 'utf8');
const $ = cheerio.load(content);

let count = 0;
$('.framer-azkep0 > .ssr-variant').each((i, el) => {
    const childClass = $(el).children().first().attr('class');
    if (childClass && childClass.includes('container')) {
        console.log("Child", i, childClass);
    }
});
