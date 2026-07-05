import fs from 'fs';
import * as cheerio from 'cheerio';

const content = fs.readFileSync('case-studies/dental-clinic-voice-receptionist.html', 'utf8');
const $ = cheerio.load(content);

$('.framer-azkep0').children().each((i, el) => {
    console.log("Child", i, $(el).attr('class'));
});
