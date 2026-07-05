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
    // Let's replace: <div class="framer-1lczr13" style="..." data-framer-component-type="RichTextContainer">
    // with: <div style="font-size: 2.5rem; font-weight: 700; color: white; margin-bottom: 8px;">5X</div><div ...
    
    // Using string matching to find the exact text, then find the div before it
    let index = html.indexOf(text);
    while (index !== -1) {
        // Search backwards for data-framer-component-type="RichTextContainer"
        const componentTypeIndex = html.lastIndexOf('data-framer-component-type="RichTextContainer"', index);
        if (componentTypeIndex !== -1 && index - componentTypeIndex < 500) {
            // Find the <div that starts this container
            const divIndex = html.lastIndexOf('<div', componentTypeIndex);
            if (divIndex !== -1 && componentTypeIndex - divIndex < 500) {
                // If it's not already prefixed with our number
                const checkStr = `<div style="font-size: 2.5rem; font-weight: 700; color: white; margin-bottom: 8px;">${number}</div>`;
                if (!html.substring(divIndex - checkStr.length - 200, divIndex).includes(checkStr)) {
                    html = html.substring(0, divIndex) + checkStr + html.substring(divIndex);
                    index += checkStr.length; // adjust index
                }
            }
        }
        index = html.indexOf(text, index + text.length);
    }
}
fs.writeFileSync('about-us.html', html);
console.log('Fixed metrics');
