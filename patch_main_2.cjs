const fs = require('fs');
let content = fs.readFileSync('src/js/main.js', 'utf8');

// We just want to remove the logic that adds the prefix.
// We can use regex to remove these blocks.

content = content.replace(/if \(\/AI models for smarter decisions\/i\.test\(text\)\) \{[\s\S]*?changed = true;\s*\}/g, '');
content = content.replace(/else if \(\/AI models for smarter decisions\/i\.test\(text\) && !\/50\\\+\/\.test\(text\)\) \{[\s\S]*?changed = true;\s*\}/g, '');
content = content.replace(/if \(\/Client satisfaction rate\/i\.test\(text\) && !\/99%\/\.test\(text\)\) \{[\s\S]*?changed = true;\s*\}/g, '');

fs.writeFileSync('src/js/main.js', content);
console.log('patched main.js properly');
