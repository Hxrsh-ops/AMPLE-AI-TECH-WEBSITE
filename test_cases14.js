import fs from 'fs';
import * as cheerio from 'cheerio';

const content = fs.readFileSync('case-studies/dental-clinic-voice-receptionist.html', 'utf8');
const $ = cheerio.load(content);

$('.framer-ve67mk-container').first().find('div, p').each((i, el) => {
    if ($(el).text() === 'Automated response') {
        console.log("Label container:", $(el).attr('class'));
        let p = $(el).parent();
        console.log("  Parent:", p.attr('class'));
        console.log("  Parent parent:", p.parent().attr('class'));
    }
});
