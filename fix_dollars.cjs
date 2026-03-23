const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'components', 'Pricing.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Replace the double dollar signs
content = content.replace(/\$\$\{mod\.price\}/g, '${mod.price}');
content = content.replace(/\$\$\{m\.price\}/g, '${m.price}');
content = content.replace(/\$\$\{calculateAlacarteTotal\(\)\}/g, '${calculateAlacarteTotal()}');

fs.writeFileSync(targetFile, content);
console.log('Fixed double dollar signs in Pricing.jsx');
