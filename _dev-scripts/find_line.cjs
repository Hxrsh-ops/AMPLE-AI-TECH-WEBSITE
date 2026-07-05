const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

let found = false;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('class="framer-1spe2co"') || lines[i].includes('framer-1spe2co')) {
        console.log(`Found framer-1spe2co on line ${i + 1}:`);
        // print a range of lines
        const start = Math.max(0, i - 10);
        const end = Math.min(lines.length - 1, i + 35);
        for (let j = start; j <= end; j++) {
            console.log(`${j + 1}: ${lines[j].substring(0, 150)}`);
        }
        found = true;
    }
}
if (!found) {
    console.log("Could not find framer-1spe2co");
}
