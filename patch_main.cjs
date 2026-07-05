const fs = require('fs');
let content = fs.readFileSync('src/js/main.js', 'utf8');

content = content.replace(/10\\\+ AI models for smarter decisions/gi, 'AI models for smarter decisions');

// We also need to remove the logic that adds the prefixes.
// Let's just find the block and replace it using string replacement.
const blockToReplace = `        if (/10\\+ AI models for smarter decisions/i.test(text)) {
             text = text.replace(/10\\+ AI models for smarter decisions/gi, '50+ AI models for smarter decisions');
             changed = true;
        } else if (/AI models for smarter decisions/i.test(text) && !/50\\+/.test(text)) {
             text = text.replace(/AI models for smarter decisions/gi, '50+ AI models for smarter decisions');
             changed = true;
        }

        if (/Client satisfaction rate/i.test(text) && !/99%/.test(text)) {
             text = text.replace(/Client satisfaction rate/gi, '99% Client satisfaction rate');
             changed = true;
        }`;

const replacement = `        if (/10\\+ AI models for smarter decisions/i.test(text)) {
             text = text.replace(/10\\+ AI models for smarter decisions/gi, 'AI models for smarter decisions');
             changed = true;
        }
        
        if (/50\\+ AI models for smarter decisions/i.test(text)) {
             text = text.replace(/50\\+ AI models for smarter decisions/gi, 'AI models for smarter decisions');
             changed = true;
        }

        if (/99% Client satisfaction rate/i.test(text)) {
             text = text.replace(/99% Client satisfaction rate/gi, 'Client satisfaction rate');
             changed = true;
        }
`;

content = content.replace(blockToReplace, replacement);
fs.writeFileSync('src/js/main.js', content);
console.log('patched main.js');
