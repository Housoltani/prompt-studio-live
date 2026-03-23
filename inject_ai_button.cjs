const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'components', 'SocialMediaEngine.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Imports
if (!content.includes('executePromptViaAI')) {
  content = content.replace(
    "import { Video, Type, Wand2, Sparkles, Share2, Clapperboard, Hash } from 'lucide-react';",
    "import { Video, Type, Wand2, Sparkles, Share2, Clapperboard, Hash, Bot, Loader2 } from 'lucide-react';\nimport { executePromptViaAI } from '../services/aiService.js';"
  );
}

// 2. States
if (!content.includes('const [aiResult')) {
  content = content.replace(
    "const [generatedScript, setGeneratedScript] = useState('');",
    "const [generatedScript, setGeneratedScript] = useState('');\n  const [isExecuting, setIsExecuting] = useState(false);\n  const [aiResult, setAiResult] = useState('');"
  );
}

// 3. Execute Function
if (!content.includes('const executeWithAI')) {
  const funcString = `
  const executeWithAI = async () => {
    if (!generatedScript) return;
    setIsExecuting(true);
    setAiResult('');
    try {
      const result = await executePromptViaAI(generatedScript);
      setAiResult(result);
    } catch (error) {
      setAiResult('Error: ' + error.message);
    } finally {
      setIsExecuting(false);
    }
  };
`;
  content = content.replace(
    "  const generateScript = () => {",
    funcString + "\n  const generateScript = () => {\n    setAiResult('');"
  );
}

// 4. Render Button & Result
if (!content.includes('onClick={executeWithAI}')) {
  const replaceStr = `<div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                    <span className="text-pink-400 font-bold">/// SCRIPT_READY</span>
                    <span className="text-xs text-gray-500">FORMAT: {platform.toUpperCase()}</span>
                  </div>`;
  const newHeader = `<div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-pink-400 font-bold">/// SCRIPT_READY</span>
                      <button 
                        onClick={executeWithAI}
                        disabled={isExecuting}
                        className="flex items-center gap-1 text-xs bg-pink-500/20 hover:bg-pink-500/40 text-pink-300 px-3 py-1 rounded-lg transition-colors border border-pink-500/30 disabled:opacity-50"
                      >
                        {isExecuting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Bot className="w-3 h-3" />}
                        {isExecuting ? 'KI arbeitet...' : 'Mit KI ausführen'}
                      </button>
                    </div>
                    <span className="text-xs text-gray-500">FORMAT: {platform.toUpperCase()}</span>
                  </div>`;
  content = content.replace(replaceStr, newHeader);
}

if (!content.includes('aiResult && (')) {
  const replaceStr2 = `{generatedScript}`;
  const newContent = `{generatedScript}
                  
                  {aiResult && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 bg-gray-950/80 border border-pink-500/30 rounded-xl relative"
                    >
                      <div className="absolute -top-3 left-4 bg-gray-900 px-2 text-xs font-bold text-pink-400 flex items-center gap-1">
                        <Bot className="w-3 h-3" /> KI ANTWORT (OpenRouter)
                      </div>
                      <div className="text-gray-200 mt-2">
                        {aiResult}
                      </div>
                    </motion.div>
                  )}`;
  content = content.replace(replaceStr2, newContent);
}

fs.writeFileSync(targetFile, content);
console.log('Patched SocialMediaEngine.jsx successfully.');
