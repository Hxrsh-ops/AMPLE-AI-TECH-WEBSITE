const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/>Enterprise-Grade<\/p>/g, '>ENTERPRISE-GRADE</p>');
html = html.replace(/>Strategic AI Partners<\/p>/g, '>STRATEGIC AI PARTNERS</p>');
html = html.replace(/>Deployed Globally<\/p>/g, '>DEPLOYED GLOBALLY</p>');

fs.writeFileSync('index.html', html);
console.log('Uppercased texts in index.html');
