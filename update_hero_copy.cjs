const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `We help businesses build practical AI — voice agents, automated workflows, and AI-powered products — that actually get used.`;
const replacement = `We architect enterprise-grade AI solutions — intelligent voice agents, autonomous workflows, and scalable products — designed for operational excellence.`;

html = html.replace(target, replacement);

fs.writeFileSync('index.html', html);
console.log('Updated hero copy in index.html');
