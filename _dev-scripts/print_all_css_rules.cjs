const fs = require('fs');

const html = fs.readFileSync('about-us.html', 'utf8');

const classes = [
    'framer-pw673',
    'framer-1bzr4nu',
    'framer-1jeik2n',
    'framer-evw9i6',
    'framer-1q3dow0'
];

console.log("=== COMPARING ALL CSS RULES ===");
const styleMatches = html.match(/<style[^>]*>([\s\S]*?)<\/style>/g);
if (styleMatches) {
    classes.forEach(cls => {
        console.log(`\n--- Rules for .${cls} ---`);
        styleMatches.forEach((styleBlock, blockIdx) => {
            if (styleBlock.includes(`.${cls}`)) {
                const escapedCls = cls.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                const regex = new RegExp(`[^\\}]*?\\.${escapedCls}[^\\}]*?\\{[^\\}]*?\\}`, 'g');
                const rules = styleBlock.match(regex);
                if (rules) {
                    rules.forEach(rule => {
                        console.log(`Block #${blockIdx}: ${rule.trim()}`);
                    });
                }
            }
        });
    });
}
