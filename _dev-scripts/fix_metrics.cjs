const fs = require('fs');
let html = fs.readFileSync('about-us.html', 'utf8');

const replacements = {
    'Faster AI implementations': '5X',
    'Businesses empowered': '5+',
    'System uptime': '99%',
    'AI models for smarter decisions': '50+',
    'Client satisfaction rate': '98%'
};

for (const [text, number] of Object.entries(replacements)) {
    const regex = new RegExp('(<div class="[^"]*" data-framer-name="Empty Space"></div>)(<div class="[^"]*"[^>]*><p [^>]*>' + text + '</p>)', 'g');
    
    // Alternative approach if previous didn't match: find the text and insert the number div before its container
    // The structure is roughly:
    // <div class="framer-134n9e8" data-framer-name="Empty Space"></div><div class="framer-1lczr13" style="..." data-framer-component-type="RichTextContainer"><p ...>Faster AI implementations</p></div>
    
    html = html.replace(regex, `<div style="font-size: 2.5rem; font-weight: 700; color: white; margin-bottom: 8px;">${number}</div>$2`);
}
fs.writeFileSync('about-us.html', html);
console.log('Fixed metrics');
