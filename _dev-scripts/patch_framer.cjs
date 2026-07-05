const fs = require('fs');

function patchFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    let original = content;
    
    // Replace desktop padding
    content = content.replace(/padding:12px 20px 12px 42px/g, 'padding:12px 20px 12px 20px');
    
    // Replace mobile paddings
    content = content.replace(/padding:6px 10px 6px 28px/g, 'padding:6px 10px 6px 10px');
    
    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`Patched ${filePath}`);
    }
}

patchFile('index.html');

// Also patch any JS files in src just in case Framer hydrates it
const glob = require('fs').readdirSync('src', { recursive: true });
for (const file of glob) {
    if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
        patchFile('src/' + file);
    }
}

