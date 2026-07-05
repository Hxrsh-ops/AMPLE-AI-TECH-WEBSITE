import fs from 'fs';
import * as cheerio from 'cheerio';

const content = fs.readFileSync('case-studies/dental-clinic-voice-receptionist.html', 'utf8');
const $ = cheerio.load(content);

console.log("Stats text:");
$('.framer-ve67mk-container, .framer-1p5v48s-container, .framer-b53hku-container').each((i, el) => {
    console.log($(el).text().substring(0, 150));
});

console.log("\nFull text in azkep0:");
console.log($('.framer-azkep0').text().replace(/0123456789/g, '').replace(/0134601235/g, '').replace(/01234/g,'').replace(/0011200000/g,''));

