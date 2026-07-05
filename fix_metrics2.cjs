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
    // We want to insert the number above the text.
    // The text is inside a <p>. The <p> is inside a <div data-framer-component-type="RichTextContainer">.
    // We can just find the text and traverse back to the <div data-framer-component-type="RichTextContainer">
    
    // Easier way: 
    // Find: <div class="framer-[a-z0-9]+" style="[^"]*" data-framer-component-type="RichTextContainer"><p class="[^"]*" data-styles-preset="[^"]*" style="[^"]*">TEXT</p></div>
    
    const regex = new RegExp(`(<div class="[^"]*" style="[^"]*" data-framer-component-type="RichTextContainer">)(<p class="[^"]*" data-styles-preset="[^"]*" style="[^"]*">${text}</p></div>)`, 'g');
    
    html = html.replace(regex, `<div style="font-size: 2.5rem; font-weight: 700; color: white; margin-bottom: 8px;">${number}</div>$1$2`);
}
fs.writeFileSync('about-us.html', html);
console.log('Fixed metrics');
