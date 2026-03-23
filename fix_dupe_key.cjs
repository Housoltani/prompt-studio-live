const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'i18n.js');
let content = fs.readFileSync(targetFile, 'utf8');

// I injected social: { aiExecuteBtn... } right after de: { and en: { and ar: {
content = content.replace(/social: \{\n      aiExecuteBtn:/g, "socialEngine: {\n      aiExecuteBtn:");

fs.writeFileSync(targetFile, content);

const targetComponent = path.join(__dirname, 'src', 'components', 'SocialMediaEngine.jsx');
let compContent = fs.readFileSync(targetComponent, 'utf8');
compContent = compContent.replace(/t\.social\./g, "t.socialEngine.");
fs.writeFileSync(targetComponent, compContent);
console.log("Fixed duplicate key");
