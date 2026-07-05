const fs = require('fs');
const path = require('path');

function searchDir(dir, pattern) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                searchDir(fullPath, pattern);
            }
        } else {
            if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.json')) {
                const content = fs.readFileSync(fullPath, 'utf8');
                if (pattern.test(content)) {
                    console.log(`Found in: ${fullPath}`);
                    const lines = content.split('\n');
                    lines.forEach((line, idx) => {
                        if (pattern.test(line)) {
                            console.log(`  Line ${idx + 1}: ${line.trim().substring(0, 150)}`);
                        }
                    });
                }
            }
        }
    }
}

console.log("=== SEARCHING FOR 'uptime' ===");
searchDir('.', /uptime/i);

console.log("\n=== SEARCHING FOR '99%' ===");
searchDir('.', /99%/i);
