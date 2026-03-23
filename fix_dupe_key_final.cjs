const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'i18n.js');
let content = fs.readFileSync(targetFile, 'utf8');

content = content.replace(
  'pricing: "💎 The Arsenal (Pricing)",\n      pricing: "💎 Pricing & Arsenal",',
  'pricing: "💎 Das Arsenal (Preise)",'
);

content = content.replace(
  'pricing: "💎 Das Arsenal (Preise)",\n      pricing: "💎 Pricing & Arsenal",',
  'pricing: "💎 Das Arsenal (Preise)",'
);

content = content.replace(
  'pricing: "💎 The Arsenal (Pricing)",\n      pricing: "💎 Das Arsenal (Preise)",',
  'pricing: "💎 The Arsenal (Pricing)",'
);

fs.writeFileSync(targetFile, content);
console.log('Cleaned up i18n keys');
