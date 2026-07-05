const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetRegex = /We help businesses build practical AI — voice agents, automated workflows,\s*<span[^>]*>and AI-powered products — that actually get used\.<\/span>/;
const replacement = `Deploying intelligent infrastructure for the modern enterprise. We build sophisticated voice agents, automated workflows, <span style="color: var(--token-fa1b40c0-dfa2-4438-b701-cba20c6fbe72, rgb(163, 163, 163)); --framer-text-color: var(--token-fa1b40c0-dfa2-4438-b701-cba20c6fbe72, rgb(163, 163, 163)); transition: color 0.3s ease;">and AI systems that deliver compounding value.</span>`;

if (targetRegex.test(html)) {
    html = html.replace(targetRegex, replacement);
    fs.writeFileSync('index.html', html);
    console.log('Updated hero copy in index.html');
} else {
    console.log('Could not find target regex');
}
