import fs from 'fs';
import * as cheerio from 'cheerio';

const files = ['case-studies/dental-clinic-voice-receptionist.html', 'case-studies/ecommerce-support-assistant.html', 'case-studies/real-estate-lead-automation.html'];

files.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    const $ = cheerio.load(content);
    console.log(f);
    let classes = [];
    $('.framer-azkep0').children().each((i, el) => {
        classes.push($(el).children().first().attr('class'));
    });
    console.log(classes.filter(c => c && c.includes('container')).slice(0, 3));
});
