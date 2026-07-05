import fs from 'fs';
import * as cheerio from 'cheerio';

const content = fs.readFileSync('case-studies/dental-clinic-voice-receptionist.html', 'utf8');
const $ = cheerio.load(content);

$('h1, h2, h3, h4, p, span').each((i, el) => {
    if ($(el).text().includes('00%')) {
        console.log('Found 00% in tag:', el.tagName, 'classes:', $(el).attr('class'));
        let p = $(el).parent();
        for (let j=0; j<3; j++) {
            if(p) {
                console.log('  Parent classes:', p.attr('class'));
                p = p.parent();
            }
        }
    }
});
