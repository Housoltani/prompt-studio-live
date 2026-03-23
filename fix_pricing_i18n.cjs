const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'i18n.js');
let content = fs.readFileSync(targetFile, 'utf8');

if (!content.includes('pricing: "💎 Das Arsenal')) {
  content = content.replace(
    'credits: "⚡ Sparks & Credits",',
    'credits: "⚡ Sparks & Credits",\n      pricing: "💎 Das Arsenal (Preise)",'
  );
  content = content.replace(
    'credits: "⚡ Sparks & Credits",',
    'credits: "⚡ Sparks & Credits",\n      pricing: "💎 Pricing & Arsenal",'
  );
  content = content.replace(
    'credits: "⚡ شحنات وكريديت",',
    'credits: "⚡ شحنات وكريديت",\n      pricing: "💎 الترسانة والأسعار",'
  );
  fs.writeFileSync(targetFile, content);
  console.log("Patched i18n for Pricing");
}
