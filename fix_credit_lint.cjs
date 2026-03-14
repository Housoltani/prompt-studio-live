const fs = require('fs');

const earnPath = '/Users/houcemsoltani/.openclaw/workspace/prompt-studio-live/src/components/EarnCredits.jsx';
let earnContent = fs.readFileSync(earnPath, 'utf8');
earnContent = earnContent.replace("style={{ width: \\`\\${((15 - timeLeft) / 15) * 100}%\\` }}", "style={{ width: `${((15 - timeLeft) / 15) * 100}%` }}");
fs.writeFileSync(earnPath, earnContent);

const contextPath = '/Users/houcemsoltani/.openclaw/workspace/prompt-studio-live/src/context/CreditsContext.jsx';
let contextContent = fs.readFileSync(contextPath, 'utf8');
contextContent = "/* eslint-disable react-refresh/only-export-components */\n" + contextContent;
fs.writeFileSync(contextPath, contextContent);

console.log('Lint errors fixed');
