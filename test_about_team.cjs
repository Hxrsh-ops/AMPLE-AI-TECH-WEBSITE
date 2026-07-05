const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('about-us.html', 'utf8');
const $ = cheerio.load(html);

const teamSection = $('section[data-framer-name="Team"]');
console.log("Team section found:", teamSection.length);

const names = ["DEON SHAJAN", "HARSHANTH", "MANISH LAL SINGH", "SAMEER AHMED"];

names.forEach(name => {
    // Find text nodes containing the name (case insensitive but we know it's caps in the screenshot)
    let found = false;
    teamSection.find('*').each(function() {
        if ($(this).children().length === 0 && $(this).text().trim() === name) {
            console.log("Found:", name);
            // Now let's traverse up to find the common card container
            let parent = $(this).parent();
            for(let i=0; i<6; i++) {
                if (parent.length) {
                    // console.log("  parent", i, parent.get(0).tagName, parent.attr('class'), parent.attr('data-framer-name'));
                    parent = parent.parent();
                }
            }
            found = true;
        }
    });
    if (!found) console.log("Not found:", name);
});

