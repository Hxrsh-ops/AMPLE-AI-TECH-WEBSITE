const fs = require('fs');

const html = fs.readFileSync('about-us.html', 'utf8');

const classes = [
    'framer-pw673',
    'framer-1bzr4nu',
    'framer-1jeik2n',
    'framer-evw9i6',
    'framer-1q3dow0'
];

let output = "=== COMPARING CSS RULES WITH MEDIA QUERIES ===\n";
const styleMatches = html.match(/<style[^>]*>([\s\S]*?)<\/style>/g);
if (styleMatches) {
    classes.forEach(cls => {
        output += `\n--- Rules for .${cls} ---\n`;
        styleMatches.forEach((styleBlock, blockIdx) => {
            const lines = styleBlock.split('\n');
            lines.forEach((line, idx) => {
                if (line.includes(`.${cls}`)) {
                    let mediaQuery = 'None';
                    for (let i = idx; i >= 0; i--) {
                        if (lines[i].includes('@media')) {
                            mediaQuery = lines[i].trim();
                            break;
                        }
                    }
                    let start = idx;
                    while (start > 0 && !lines[start].includes('}')) {
                        start--;
                    }
                    if (start > 0) start++;
                    let end = idx;
                    while (end < lines.length && !lines[end].includes('}')) {
                        end++;
                    }
                    const rule = lines.slice(start, end + 1).join('\n').trim();
                    output += `Block #${blockIdx} | MQ: ${mediaQuery}\n  Rule: ${rule}\n`;
                }
            });
        });
    });
}

fs.writeFileSync('media_queries_results.txt', output);
console.log('Results written to media_queries_results.txt');
