const fs = require('fs');
let content = fs.readFileSync('src/components/LiveGenerator.jsx', 'utf8');

const enhanceFunction = `
  const handleEnhancePrompt = async () => {
    if (!input.trim()) {
      toast.error('Bitte gib ein paar Stichwörter ein (z.B. "Cyberpunk Stadt").');
      return;
    }
    setIsEnhancing(true);
    // Simulate AI tuning
    setTimeout(() => {
      const tunedPrompts = {
        image: \`A breathtaking \${input}, 8k resolution, cinematic lighting, masterpiece, hyper-detailed, dramatic shadows, glowing neon accents, shot on 35mm lens, volumetric fog.\`,
        video: \`Cinematic drone shot of \${input}, slow panning motion, hyper-realistic, dynamic lighting, 4k, 60fps, Unreal Engine 5 render style.\`,
        music: \`[Intro] Epic orchestral build-up\\n[Chorus] Synthwave beat with heavy bass line inspired by \${input}\\n[Outro] Fading synth pad\`,
        text: \`Act as an expert. Please provide a highly detailed and professional response regarding: \${input}. Structure your answer with clear headings and bullet points.\`
      };
      
      const newPrompt = tunedPrompts[generationMode] || tunedPrompts.text;
      setInput(newPrompt);
      setIsEnhancing(false);
      soundEngine.playSuccess();
      toast.success('Prompt wurde durch KI optimiert! ✨');
    }, 1500);
  };
`;

// Insert after setIsListening
content = content.replace(/const \[isListening, setIsListening\] = useState\(false\);/, 'const [isListening, setIsListening] = useState(false);\n' + enhanceFunction);

// Inject button
const buttonUI = `
              {/* Magic Enhance Button */}
              <button 
                type="button"
                onClick={handleEnhancePrompt}
                disabled={isEnhancing || !input.trim()}
                className={\`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all \${input.trim() ? 'bg-indigo-600/20 text-indigo-400 hover:bg-indigo-500 hover:text-white' : 'text-slate-600'}\`}
                title="Prompt Tuning (Magic Enhance)"
              >
                {isEnhancing ? (
                  <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span className="text-xl">🪄</span>
                )}
              </button>
`;

content = content.replace(/<div className="flex-1">/, buttonUI + '\n              <div className="flex-1">');

fs.writeFileSync('src/components/LiveGenerator.jsx', content, 'utf8');
