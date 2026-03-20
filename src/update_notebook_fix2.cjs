const fs = require('fs');
let file = fs.readFileSync('src/components/NotebookLM.jsx', 'utf8');

file = file.replace(/height: \\\`\\\$\\{Math\.random\(\) \* 60 \+ 10\\}%\\\`/g, 'height: `${Math.random() * 60 + 10}%`');

fs.writeFileSync('src/components/NotebookLM.jsx', file, 'utf8');
