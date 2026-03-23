const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'i18n.js');
let content = fs.readFileSync(targetFile, 'utf8');

// Insert carefully into 'de'
content = content.replace(
  'learning: "🎓 KI Academy",\n      credits: "⚡ Sparks & Credits",',
  'learning: "🎓 KI Academy",\n      credits: "⚡ Sparks & Credits",\n      pricing: "💎 Das Arsenal (Preise)",'
);

// Insert carefully into 'en' (might already be there, let's clean it up)
content = content.replace(
  'learning: "🎓 AI Academy",\n      credits: "⚡ Sparks & Credits",',
  'learning: "🎓 AI Academy",\n      credits: "⚡ Sparks & Credits",\n      pricing: "💎 The Arsenal (Pricing)",'
);

// Insert carefully into 'ar'
content = content.replace(
  'learning: "🎓 أكاديمية الذكاء الاصطناعي",\n      credits: "⚡ شرارات ورصيد",',
  'learning: "🎓 أكاديمية الذكاء الاصطناعي",\n      credits: "⚡ شرارات ورصيد",\n      pricing: "💎 الترسانة والأسعار",'
);

fs.writeFileSync(targetFile, content);
console.log('Fixed i18n pricing tabs');
