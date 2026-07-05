import fs from 'fs';
import * as cheerio from 'cheerio';

const files = ['case-studies/dental-clinic-voice-receptionist.html', 'case-studies/ecommerce-support-assistant.html', 'case-studies/real-estate-lead-automation.html'];

files.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    const $ = cheerio.load(content);
    console.log(f);
    $('.framer-1mf6hfp').each((i, el) => {
        console.log("  Val", i, $(el).text());
    });
    $('.framer-1trpgh8').each((i, el) => {
        console.log("  Label", i, $(el).text());
    });
});
