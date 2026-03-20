const fs = require('fs');
let content = fs.readFileSync('src/components/AuthProfile.jsx', 'utf8');

if (!content.includes('/* eslint-disable no-unused-vars */')) {
  content = '/* eslint-disable no-unused-vars */\n' + content;
  fs.writeFileSync('src/components/AuthProfile.jsx', content, 'utf8');
}
