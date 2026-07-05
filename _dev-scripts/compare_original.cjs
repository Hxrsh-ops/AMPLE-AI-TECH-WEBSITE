const fs = require('fs');
const cheerio = require('cheerio');

const originalContent = fs.readFileSync('temp_repo/about-us.html', 'utf8');
const currentContent = fs.readFileSync('about-us.html', 'utf8');

const $orig = cheerio.load(originalContent);
const $curr = cheerio.load(currentContent);

console.log("=== ORIGINAL COL 3 ===");
console.log($orig('.framer-1jeik2n .framer-v-z3b0u1').first().html());

console.log("\n=== CURRENT COL 3 ===");
console.log($curr('.framer-1jeik2n .framer-v-z3b0u1').first().html());
