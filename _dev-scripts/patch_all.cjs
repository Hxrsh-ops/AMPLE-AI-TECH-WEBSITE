const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist' && file !== 'temp_repo') {
        walkSync(fullPath, filelist);
      }
    } else {
      if (file.endsWith('.html') || file.endsWith('.js')) {
        filelist.push(fullPath);
      }
    }
  });
  return filelist;
}

const files = walkSync('.');

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;

  // 1. Remove address from HTML pages
  if (content.includes('Enterprise Hub, Kakkanad')) {
    // We can just strip the text "Enterprise Hub, Kakkanad, Kochi, Kerala, India 682 030"
    content = content.replace(/Enterprise Hub, Kakkanad, Kochi, Kerala, India 682 030/g, '');
    content = content.replace(/Enterprise Hub, Kakkanad<br>Kochi, Kerala<br>India 682 030/g, '');
    
    // Remove the href to maps
    content = content.replace(/href="https:\/\/maps\.google\.com\/\?q=Enterprise\+Hub,\+Kakkanad,\+Kochi,\+Kerala,\+India"/g, '');
    
    changed = true;
  }
  
  // Also remove "Address" text if it's the heading for it, but only in the footer contexts
  // The footer title is <p class="framer-text ...">Address</p>
  // Let's replace >Address</p> with > </p>
  if (content.includes('>Address</p>')) {
      content = content.replace(/>Address<\/p>/g, '></p>');
      changed = true;
  }

  // 2. Update phone numbers in footer and anywhere else to +91 7338989888
  if (content.includes('+91 7XXXXXXXXX') || content.includes('+91%207XXXXXXXXX') || content.includes('tel:+91 7XXXXXXXXX') || content.includes('7XXXXXXXXX')) {
    content = content.replace(/\+91 7XXXXXXXXX/g, '+91 7338989888');
    content = content.replace(/\+91%207XXXXXXXXX/g, '+91%207338989888');
    content = content.replace(/tel:\+91 7XXXXXXXXX/g, 'tel:+91 7338989888');
    content = content.replace(/7XXXXXXXXX/g, '7338989888'); // catch-all just in case
    changed = true;
  }
  
  // Menu js changes
  if (f.endsWith('main.js') && content.includes('<div class="ampleai-menu-info-block"><h4>LOCATION</h4><p>')) {
      // Remove the location block completely in JS menu
      content = content.replace(/<div class="ampleai-menu-info-block"><h4>LOCATION<\/h4><p>.*?<\/div>/, '');
      changed = true;
  }

  if (changed) {
    fs.writeFileSync(f, content);
    console.log('Patched', f);
  }
});
