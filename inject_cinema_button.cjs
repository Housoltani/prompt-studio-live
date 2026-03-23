const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'components', 'CinemaStudioPro.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Imports
if (!content.includes('executePromptViaAI')) {
  content = content.replace(
    "import { Camera, Film, Lightbulb, Aperture, Settings, Sparkles, Wand2, Copy, CheckCircle2 } from 'lucide-react';",
    "import { Camera, Film, Lightbulb, Aperture, Settings, Sparkles, Wand2, Copy, CheckCircle2, Bot, Loader2 } from 'lucide-react';\nimport { executePromptViaAI } from '../services/aiService.js';"
  );
}

// 2. States
if (!content.includes('const [aiResult')) {
  content = content.replace(
    "const [isGenerating, setIsGenerating] = useState(false);",
    "const [isGenerating, setIsGenerating] = useState(false);\n  const [isExecuting, setIsExecuting] = useState(false);\n  const [aiResult, setAiResult] = useState('');"
  );
}

// 3. Execute Function
if (!content.includes('const executeWithAI')) {
  const funcString = `
  const executeWithAI = async () => {
    if (!generatedPrompt) return;
    setIsExecuting(true);
    setAiResult('');
    try {
      // Ask the AI to act as a Director and visualize the prompt
      const aiPrompt = "You are a master cinematographer. Read this Midjourney prompt and vividly describe the final image as a Director's Pre-Visualization (Pre-Vis) in 2-3 sentences. Focus on lighting, mood, and composition.\\n\\nPrompt: " + generatedPrompt;
      const result = await executePromptViaAI(aiPrompt);
      setAiResult(result);
    } catch (error) {
      setAiResult('Error: ' + error.message);
    } finally {
      setIsExecuting(false);
    }
  };
`;
  content = content.replace(
    "  const generatePrompt = () => {",
    funcString + "\n  const generatePrompt = () => {\n    setAiResult('');"
  );
}

// 4. Render Button
if (!content.includes('onClick={executeWithAI}')) {
  // Find where generatedPrompt is displayed
  // We'll look for: <div className="bg-gray-950 p-6 rounded-xl font-mono text-sm text-gray-300 border border-gray-800 leading-relaxed">
  const replaceStr = `<div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-cyan-400">
                    <Wand2 className="w-5 h-5" /> Final Prompt
                  </h3>`;
  const newHeader = `<div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-cyan-400">
                      <Wand2 className="w-5 h-5" /> Final Prompt
                    </h3>
                    {generatedPrompt && (
                      <button 
                        onClick={executeWithAI}
                        disabled={isExecuting}
                        className="flex items-center gap-2 text-xs bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 px-4 py-1.5 rounded-lg transition-colors border border-cyan-500/30 disabled:opacity-50 font-sans"
                      >
                        {isExecuting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
                        {isExecuting ? 'KI analysiert...' : 'KI Pre-Vis (Director)'}
                      </button>
                    )}
                  </div>`;
  content = content.replace(replaceStr, newHeader);
}

// 5. Render Result
if (!content.includes('aiResult && (')) {
  // Look for the end of the prompt display box
  const replaceStr2 = `{generatedPrompt}
                </div>`;
  const newContent = `{generatedPrompt}
                </div>
                
                {aiResult && (
                  <div className="mt-6 p-5 bg-gray-900/80 border border-cyan-500/30 rounded-xl relative shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                    <div className="absolute -top-3 left-6 bg-gray-950 px-3 text-xs font-bold text-cyan-400 flex items-center gap-2 border border-cyan-500/30 rounded-full py-0.5">
                      <Bot className="w-3 h-3" /> DIRECTOR'S PRE-VIS (AI)
                    </div>
                    <div className="text-gray-300 mt-2 text-sm leading-relaxed font-sans">
                      {aiResult}
                    </div>
                  </div>
                )}`;
  content = content.replace(replaceStr2, newContent);
}

fs.writeFileSync(targetFile, content);
console.log('Patched CinemaStudioPro.jsx successfully.');
