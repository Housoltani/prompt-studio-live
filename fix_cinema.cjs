const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'components', 'CinemaStudioPro.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Ensure correct imports
if (!content.includes('import { executePromptViaAI }')) {
  content = content.replace(
    "import { Camera, Film, Aperture, Sun, Move, MonitorPlay, Sparkles, Copy, Check } from 'lucide-react';",
    "import { Camera, Film, Aperture, Sun, Move, MonitorPlay, Sparkles, Copy, Check, Bot, Loader2 } from 'lucide-react';\nimport { executePromptViaAI } from '../services/aiService.js';\nimport { useAuth } from '../context/AuthContext.jsx';\nimport { supabase } from '../supabaseClient.js';\nimport { toast } from 'react-hot-toast';\nimport { useNavigate } from 'react-router-dom';"
  );
}

// Ensure states
if (!content.includes('const [isExecuting, setIsExecuting]')) {
  content = content.replace(
    "const [copied, setCopied] = useState(false);",
    "const [copied, setCopied] = useState(false);\n  const [isExecuting, setIsExecuting] = useState(false);\n  const [isSaving, setIsSaving] = useState(false);\n  const [aiResult, setAiResult] = useState('');\n  const { user } = useAuth();\n  const navigate = useNavigate();"
  );
}

// Check where the button for executeWithAI goes
if (!content.includes('onClick={executeWithAI}')) {
  const replaceStr = `<div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-cyan-400">
                    <Sparkles className="w-5 h-5" /> Final Prompt
                  </h3>`;
  const newHeader = `<div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-cyan-400">
                      <Sparkles className="w-5 h-5" /> Final Prompt
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

// Check where the AI result goes
if (!content.includes('aiResult && (')) {
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
console.log('Fixed CinemaStudioPro.jsx completely.');
