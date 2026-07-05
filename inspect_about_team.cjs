const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('about-us.html', 'utf8');
const $ = cheerio.load(html);

const teamSection = $('section[data-framer-name="Team"]');
console.log("Team section found:", teamSection.length);

const teamMembers = teamSection.find('.framer-177feun'); // Assuming similar classes or let's search by name
if (teamMembers.length === 0) {
    // try finding by name
    console.log("Looking for Deon Shajan...");
    const deon = teamSection.find(':contains("DEON SHAJAN")').last().parent();
    console.log(deon.html() ? deon.html().substring(0, 500) : "Not found");
} else {
    console.log("Found members by class.");
}

// Better yet, let's just dump the classes of the images inside the team section
const images = teamSection.find('img');
console.log("Images in team section:", images.length);
if(images.length > 0) {
    console.log("First image parent tree:");
    let p = $(images[0]).parent();
    for(let i=0; i<4; i++) {
        if(p) {
            console.log(p.get(0).tagName, p.attr('class'), p.attr('data-framer-name'));
            p = p.parent();
        }
    }
}
