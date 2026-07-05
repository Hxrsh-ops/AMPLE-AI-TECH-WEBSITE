const fs = require('fs');
let html = fs.readFileSync('about-us.html', 'utf8');

// For each metric, we'll find the `<p` that immediately precedes it.
const metrics = [
    { text: 'Faster AI implementations', style: 'margin-top: 0px; padding-top: 6px; padding-bottom: 0px;' },
    { text: 'Businesses empowered', style: 'padding-top: 6px;' },
    { text: 'System uptime', style: 'padding-top: 6px;' },
    { text: 'AI models for smarter decisions', style: 'padding-top: 6px;' },
    { text: 'Client satisfaction rate', style: 'margin-top: 0px; padding-top: 6px;' }
];

for (const { text, style } of metrics) {
    // Find: <p class="[^"]*" data-styles-preset="[^"]*" style="([^"]*)"><span[^>]*>[^<]*</span>text</p>
    const regex = new RegExp(`(<p [^>]*style=")([^"]*)("><span[^>]*>[^<]*</span>${text}</p>)`, 'g');
    html = html.replace(regex, (match, p1, p2, p3) => {
        // Only add if not already there
        if (p2.includes(style)) return match;
        // make sure there is a semicolon
        const newStyle = p2.trim().endsWith(';') ? `${p2} ${style}` : `${p2}; ${style}`;
        return `${p1}${newStyle}${p3}`;
    });
}

fs.writeFileSync('about-us.html', html);
console.log('Applied styles');
