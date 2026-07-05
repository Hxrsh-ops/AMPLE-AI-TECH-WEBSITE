const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/>Kochi, India<\/p>/g, '>Enterprise-Grade</p>');
html = html.replace(/>Wednesday, 10:58 AM<\/div>/g, '>Strategic AI Partners</div>');
html = html.replace(/>\(10\.8500° N, 76\.2710° E\)<\/p>/g, '>Deployed Globally</p>');

fs.writeFileSync('index.html', html);
console.log('Updated texts in index.html');
