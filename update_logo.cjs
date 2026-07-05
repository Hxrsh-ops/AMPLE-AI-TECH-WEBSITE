const fs = require('fs');

const oldLogo = `<span style="font-family: 'PP Neue Montreal', 'Neue Montreal', 'Geist', sans-serif; font-size: 18px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em; text-transform: none; pointer-events: auto; text-align: center;">AmpletechAI</span>`;
const newLogo = `<img src="/assets/ampleai-logo.svg" alt="AmpletechAI Logo" style="height: 24px; width: auto; object-fit: contain">`;

for (const file of ['index.html', 'about-us.html']) {
    let html = fs.readFileSync(file, 'utf8');
    html = html.split(oldLogo).join(newLogo);
    fs.writeFileSync(file, html);
    console.log('Updated logo in', file);
}
