const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
lines.forEach((line, index) => {
  if (line.includes('ample-mobile-stat-block')) {
    console.log(`Line ${index + 1}: ${line}`);
    // Print 10 lines before and after
    const start = Math.max(0, index - 10);
    const end = Math.min(lines.length - 1, index + 10);
    for (let i = start; i <= end; i++) {
      console.log(`  [${i+1}]: ${lines[i]}`);
    }
  }
});
