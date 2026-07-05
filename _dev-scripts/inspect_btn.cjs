const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /<div[^>]*framer-kl0AZ[^>]*>.*?<\/div><\/div><\/div>/g;
let match = regex.exec(html);
if (match) {
  console.log(match[0].substring(0, 500));
}
