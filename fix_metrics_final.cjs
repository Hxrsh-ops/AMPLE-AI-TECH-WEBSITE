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
    // Only replace occurrences that are immediately preceded by a > character
    // to avoid matching inside attributes or other places
    
    // We will inject a span right before the text.
    const injectedHTML = `<span style="display:block; font-size: 2.5rem; font-weight: 700; color: white; margin-bottom: 8px;">${number}</span>${text}`;
    
    // Find >Faster AI implementations
    const target = `>${text}`;
    const replacement = `>${injectedHTML}`;
    
    html = html.split(target).join(replacement);
}

fs.writeFileSync('about-us.html', html);
console.log('Fixed metrics with spans');
