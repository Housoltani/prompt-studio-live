const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'i18n.js');
let content = fs.readFileSync(targetFile, 'utf8');

// The naive replacement added duplicates. Let's fix.
// Just a clean search and replace for the exact lines.
content = content.replace(
  'pricing: "💎 Pricing & Arsenal",\n      pricing: "💎 Das Arsenal (Preise)",',
  'pricing: "💎 Pricing & Arsenal",'
);

fs.writeFileSync(targetFile, content);
console.log('Fixed duplicate keys in i18n.js');
