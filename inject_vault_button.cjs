const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'components', 'CinemaStudioPro.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Imports
if (!content.includes('useAuth')) {
  content = content.replace(
    "import { executePromptViaAI } from '../services/aiService.js';",
    "import { executePromptViaAI } from '../services/aiService.js';\nimport { useAuth } from '../context/AuthContext';\nimport { supabase } from '../supabaseClient';\nimport { toast } from 'react-hot-toast';\nimport { useNavigate } from 'react-router-dom';"
  );
}

// 2. States & Hooks
if (!content.includes('const { user } = useAuth()')) {
  content = content.replace(
    "const [aiResult, setAiResult] = useState('');",
    "const [aiResult, setAiResult] = useState('');\n  const { user } = useAuth();\n  const navigate = useNavigate();\n  const [isSaving, setIsSaving] = useState(false);"
  );
}

// 3. Save to Vault Function
if (!content.includes('const saveToVault')) {
  const funcString = `
  const saveToVault = async () => {
    if (!user) {
      toast.error('Zugriff verweigert. Bitte im Hauptquartier einloggen!', { icon: '🔒' });
      navigate('/auth');
      return;
    }
    if (!generatedPrompt) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase.from('prompts').insert([
        { 
          user_id: user.id, 
          title: 'Cinema Studio Prompt', 
          content: generatedPrompt, 
          description: subject || 'Unbenannt', 
          category: 'Midjourney', 
          is_public: false 
        }
      ]);
      if (error) throw error;
      toast.success('Prompt erfolgreich im Tresor gesichert!', { icon: '🗄️' });
    } catch (error) {
      toast.error('Fehler beim Speichern: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };
`;
  content = content.replace(
    "  const generatePrompt = () => {",
    funcString + "\n  const generatePrompt = () => {"
  );
}

// 4. Render Button
if (!content.includes('onClick={saveToVault}')) {
  // We look for: <button onClick={copyToClipboard} ...
  // We will insert the "Save" button right before the copy button or next to it.
  const replaceStr = `<button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/25"
                  >`;
  const newButton = `<button 
                    onClick={saveToVault}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-cyan-400 px-6 py-3 rounded-xl font-bold transition-all border border-cyan-500/30"
                  >
                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>}
                    In Tresor speichern
                  </button>
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/25"
                  >`;
  content = content.replace(replaceStr, newButton);
}

fs.writeFileSync(targetFile, content);
console.log('Patched CinemaStudioPro.jsx with Vault button successfully.');
