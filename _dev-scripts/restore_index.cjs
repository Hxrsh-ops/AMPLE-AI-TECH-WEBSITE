const fs = require('fs');

const original = fs.readFileSync('temp_repo/index.html', 'utf8');
const current = fs.readFileSync('index.html', 'utf8');

fs.writeFileSync('index.html.backup', current);
fs.writeFileSync('index.html', original);

console.log("Restored index.html");
