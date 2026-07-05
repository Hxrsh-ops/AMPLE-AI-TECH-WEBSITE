const fs = require('fs');
let html = fs.readFileSync('about-us.html', 'utf8');
console.log("Includes 5X:", html.includes('>5X</div>'));
