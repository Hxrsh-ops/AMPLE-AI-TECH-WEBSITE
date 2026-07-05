const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `<div class="framer-r3lvhb-container" data-code-component-plugin-id="84d4c1"><!--$--><div style="color:var(--token-fa1b40c0-dfa2-4438-b701-cba20c6fbe72, rgb(163, 163, 163)); width:max-content; min-width:max-content; font-family:&quot; Geist&quot; , &quot; Geist Placeholder&quot; , sans-serif; font-size:12px; font-style:normal; font-weight:500; letter-spacing:0em; line-height:1em">Strategic AI Partners</div><!--/$--></div>`;

const replacement = `<div class="framer-18af5ms" style="transform:none" data-framer-component-type="RichTextContainer"><p class="framer-text framer-styles-preset-12bh78l" data-styles-preset="Ty1QBpcfl" style="--framer-text-color:var(--token-fa1b40c0-dfa2-4438-b701-cba20c6fbe72, rgb(163, 163, 163))">Strategic AI Partners</p></div>`;

html = html.replace(target, replacement);

fs.writeFileSync('index.html', html);
console.log('Updated font in index.html');
