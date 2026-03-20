const fs = require('fs');
let file = fs.readFileSync('src/components/NotebookLM.jsx', 'utf8');

// Fix the escaped backticks that caused the syntax error
file = file.replace(/height: \\\`\\\$\\{Math.random\(\) \* 60 \+ 10\\}%\\\`/g, "height: `${Math.random() * 60 + 10}%`");

fs.writeFileSync('src/components/NotebookLM.jsx', file, 'utf8');
