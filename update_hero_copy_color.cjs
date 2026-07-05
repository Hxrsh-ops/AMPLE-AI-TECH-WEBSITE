const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `Deploying intelligent infrastructure for the modern enterprise. We build sophisticated voice agents, automated workflows, <span style="color: var(--token-fa1b40c0-dfa2-4438-b701-cba20c6fbe72, rgb(163, 163, 163)); --framer-text-color: var(--token-fa1b40c0-dfa2-4438-b701-cba20c6fbe72, rgb(163, 163, 163)); transition: color 0.3s ease;">and AI systems that deliver compounding value.</span>`;
const replacement = `Deploying intelligent infrastructure for the modern enterprise. <span style="color: var(--token-fa1b40c0-dfa2-4438-b701-cba20c6fbe72, rgb(163, 163, 163)); --framer-text-color: var(--token-fa1b40c0-dfa2-4438-b701-cba20c6fbe72, rgb(163, 163, 163)); transition: color 0.3s ease;">We build sophisticated voice agents, automated workflows, and AI systems that deliver compounding value.</span>`;

html = html.replace(target, replacement);

fs.writeFileSync('index.html', html);
console.log('Updated hero copy color in index.html');
