const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('about-us.html', 'utf8');
const $ = cheerio.load(html);

const teamSection = $('section[data-framer-name="Team"]');
let cssAdded = false;

teamSection.find('div[data-framer-name="Thumbnail"]').each(function() {
    let thumb = $(this);
    let parent = thumb.parent();
    let nameNode = parent.find('div[data-framer-name="Top"] h2.framer-text');
    let name = nameNode.text().trim() || "Team Member";
    
    // Extract initials
    let initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    // The new content
    let newHtml = `
    <div class="amp-premium-avatar" style="width: 100%; height: 100%; position: relative; background: #080808; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.03);">
        <div class="amp-premium-grid" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 20px 20px; z-index: 1;"></div>
        <div class="amp-premium-orb" style="position: absolute; width: 150px; height: 150px; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); filter: blur(20px); z-index: 2;"></div>
        <div class="amp-premium-initials" style="position: relative; z-index: 3; color: rgba(255,255,255,0.8); font-family: 'Geist', sans-serif; font-size: 48px; font-weight: 300; letter-spacing: 4px; text-shadow: 0 0 20px rgba(255,255,255,0.2);">${initials}</div>
    </div>
    `;

    // Ensure thumbnail wrapper preserves aspect ratio natively without relying on Framer's img
    thumb.empty();
    thumb.css('aspect-ratio', '0.9302325581395349');
    thumb.css('height', 'auto');
    thumb.css('width', '100%');
    thumb.append(newHtml);
});

fs.writeFileSync('about-us.html', $.html());
console.log("Patched 12 thumbnails");
