const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('about-us.html', 'utf8');
const $ = cheerio.load(html);

// Ensure the new amp-premium-avatar looks super premium
const teamSection = $('section[data-framer-name="Team"]');
let cssAdded = false;

teamSection.find('.amp-premium-avatar').each(function() {
    let thumb = $(this);
    // Add an animation for the orb
    let orb = thumb.find('.amp-premium-orb');
    // Change the filter blur to look cleaner and add a subtle geometric crosshair behind it
    thumb.css('border', '1px solid rgba(255, 255, 255, 0.08)');
    thumb.css('background', 'linear-gradient(135deg, #0d0d0d 0%, #050505 100%)');
    
    // update initials font to match the premium brand feel
    let initials = thumb.find('.amp-premium-initials');
    initials.css('font-family', '"TASA Orbiter", "TASA Orbiter Placeholder", sans-serif');
    initials.css('font-size', '60px');
    initials.css('letter-spacing', '-1px');
    initials.css('color', '#ffffff');
    initials.css('text-shadow', '0px 0px 30px rgba(255, 255, 255, 0.3)');
    initials.css('font-weight', '700');
});

fs.writeFileSync('about-us.html', $.html());
console.log("Upgraded premium layout");
