import fs from 'fs';

const path = './prompt-studio-live/src/components/PromptArena.jsx';
let content = fs.readFileSync(path, 'utf8');

// Enhance the Arena component with a "Live Battle" Mode concept
// Add state for "mode": 'vote' | 'battle'
content = content.replace(/const \[voted, setVoted\] = useState\(false\);/, `
  const [voted, setVoted] = useState(false);
  const [mode, setMode] = useState('vote'); // 'vote' or 'battle'
  const [battleInput, setBattleInput] = useState('');
  const [battleStatus, setBattleStatus] = useState('idle'); // 'idle', 'generating', 'done'
  const [myBattleImg, setMyBattleImg] = useState('');
  const [opponentImg, setOpponentImg] = useState('');
  const [opponentProgress, setOpponentProgress] = useState(0);
`);

// Add the battle handler
content = content.replace(/const handleVote = \(id\) => \{/, `
  const startLiveBattle = () => {
    if (!battleInput.trim()) {
      toast.error('Schreibe zuerst einen Prompt für dein Bild!', { icon: '⚠️' });
      return;
    }
    soundEngine.playPop();
    setBattleStatus('generating');
    setOpponentProgress(0);
    
    // Simulate opponent generation
    const interval = setInterval(() => {
      setOpponentProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 15;
      });
    }, 500);

    setTimeout(() => {
      setMyBattleImg('https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=800&q=80');
      setOpponentImg('https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80');
      setBattleStatus('done');
      soundEngine.playSuccess();
      toast.success('Battle beendet! Die Community stimmt jetzt ab.', { icon: '🏆' });
    }, 4000);
  };

  const handleVote = (id) => {`);

// Add a mode toggle below the header
content = content.replace(/(<div className="mb-10 text-center">[\s\S]*?<\/p>\n\s*<\/div>)/, `$1\n
      {/* MODE TOGGLE */}
      <div className="flex justify-center gap-4 mb-10">
        <button 
          onClick={() => { setMode('vote'); soundEngine.playPop(); }}
          className={\`px-6 py-2 rounded-full font-bold text-sm transition-all \${mode === 'vote' ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}\`}
        >
          🗳️ Community Voting
        </button>
        <button 
          onClick={() => { setMode('battle'); soundEngine.playPop(); }}
          className={\`px-6 py-2 rounded-full font-bold text-sm transition-all \${mode === 'battle' ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}\`}
        >
          ⚔️ Live Battle starten
        </button>
      </div>
`);

// Wrap the current main grid in a condition `if (mode === 'vote')`
// And add the battle UI
content = content.replace(/(<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">[\s\S]*?<\/div>)/, `
      {mode === 'vote' ? (
        $1
      ) : (
        <div className="glass-card p-6 rounded-3xl border border-orange-500/30 bg-slate-900/60 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-orange-400">Live 1v1 Battle</h3>
            <p className="text-slate-400 text-sm mt-2">Dein Gegner (@PixelNinja) wartet. Thema: <strong className="text-white">Cyberpunk Samurai</strong></p>
          </div>

          {battleStatus === 'idle' && (
            <div className="flex flex-col gap-4 max-w-2xl mx-auto">
              <textarea 
                value={battleInput}
                onChange={(e) => setBattleInput(e.target.value)}
                placeholder="Schreibe deinen besten Midjourney v6 Prompt hier..."
                className="w-full bg-slate-950/50 border border-slate-700 rounded-xl p-4 text-white h-32 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none"
              ></textarea>
              <button 
                onClick={startLiveBattle}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-black py-4 rounded-xl text-lg shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all transform hover:scale-[1.02]"
              >
                🚀 Prompt einreichen & Rendern (60s)
              </button>
            </div>
          )}

          {battleStatus === 'generating' && (
            <div className="flex justify-between items-center gap-8 max-w-4xl mx-auto py-12">
              <div className="flex-1 text-center">
                <div className="w-full h-64 bg-slate-800 rounded-2xl border-2 border-dashed border-orange-500/50 flex flex-col items-center justify-center animate-pulse mb-4">
                  <span className="text-4xl mb-2">🧑‍🎨</span>
                  <p className="text-orange-400 font-bold">Dein Bild generiert...</p>
                </div>
              </div>
              <div className="text-4xl font-black text-slate-600 italic">VS</div>
              <div className="flex-1 text-center">
                <div className="w-full h-64 bg-slate-800 rounded-2xl border-2 border-slate-700 flex flex-col items-center justify-center mb-4 relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-full bg-red-500/20 transition-all duration-300" style={{height: \`\${opponentProgress}%\`}}></div>
                  <span className="text-4xl mb-2 relative z-10">🥷</span>
                  <p className="text-slate-400 font-bold relative z-10">Gegner generiert... {opponentProgress}%</p>
                </div>
              </div>
            </div>
          )}

          {battleStatus === 'done' && (
            <div className="flex justify-between items-start gap-8 max-w-5xl mx-auto">
              <div className="flex-1 text-center">
                <h4 className="text-xl font-bold text-orange-400 mb-4">Du</h4>
                <div className="rounded-2xl overflow-hidden border-4 border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                  <img src={myBattleImg} alt="Dein Bild" className="w-full h-auto aspect-[3/4] object-cover" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center h-full pt-32">
                <div className="text-5xl font-black text-white italic mb-2">VS</div>
                <div className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700 font-bold uppercase tracking-widest">
                  Voting aktiv
                </div>
              </div>
              <div className="flex-1 text-center">
                <h4 className="text-xl font-bold text-slate-400 mb-4">@PixelNinja</h4>
                <div className="rounded-2xl overflow-hidden border-4 border-slate-700">
                  <img src={opponentImg} alt="Gegner Bild" className="w-full h-auto aspect-[3/4] object-cover" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
`);

fs.writeFileSync(path, content);
