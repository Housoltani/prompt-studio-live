const fs = require('fs');
const path = require('path');

function patchFile(fileName, creditCost, toolName) {
  const targetFile = path.join(__dirname, 'src', 'components', fileName);
  let content = fs.readFileSync(targetFile, 'utf8');

  // Add import if missing
  if (!content.includes('useCredits')) {
    content = content.replace(
      "import { useNavigate } from 'react-router-dom';",
      "import { useNavigate } from 'react-router-dom';\nimport { useCredits } from '../context/CreditsContext.jsx';"
    );
    // If useNavigate wasn't there (like in SocialMediaEngine)
    if (!content.includes("import { useCredits }")) {
      content = content.replace(
        "import { executePromptViaAI } from '../services/aiService.js';",
        "import { executePromptViaAI } from '../services/aiService.js';\nimport { useCredits } from '../context/CreditsContext.jsx';"
      );
    }
  }

  // Add hook if missing
  if (!content.includes('const { spendCredits }')) {
    if (fileName === 'CinemaStudioPro.jsx') {
      content = content.replace(
        "const navigate = useNavigate();",
        "const navigate = useNavigate();\n  const { spendCredits } = useCredits();"
      );
    } else {
      content = content.replace(
        "const [aiResult, setAiResult] = useState('');",
        "const [aiResult, setAiResult] = useState('');\n  const { spendCredits } = useCredits();"
      );
    }
  }

  // Add credit check inside executeWithAI
  if (!content.includes('spendCredits(')) {
    const findStr = "setIsExecuting(true);\n    setAiResult('');";
    const replaceStr = `if (!spendCredits(${creditCost}, "${toolName}")) return;\n    setIsExecuting(true);\n    setAiResult('');`;
    content = content.replace(findStr, replaceStr);
  }

  // Update button text to show credit cost
  if (fileName === 'CinemaStudioPro.jsx') {
    content = content.replace(
      "{isExecuting ? 'Visualizing...' : 'KI Pre-Vis'}",
      "{isExecuting ? 'Visualizing...' : 'KI Pre-Vis (5 ⚡)'}"
    );
  } else if (fileName === 'SocialMediaEngine.jsx') {
    content = content.replace(
      "{isExecuting ? 'KI arbeitet...' : 'Mit KI ausführen'}",
      "{isExecuting ? 'KI arbeitet...' : 'Mit KI ausführen (2 ⚡)'}"
    );
  }

  fs.writeFileSync(targetFile, content);
  console.log(`Patched ${fileName} with Credits successfully.`);
}

patchFile('CinemaStudioPro.jsx', 5, 'KI Pre-Vis (Director)');
patchFile('SocialMediaEngine.jsx', 2, 'AI Script Runner');
