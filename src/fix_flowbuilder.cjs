const fs = require('fs');

let content = fs.readFileSync('src/components/FlowBuilder.jsx', 'utf8');

// The original multiplayerButton insertion left a mess with duplicate <button onClick={runFlow}> or missing <div className="flex gap-3">
// Let's clean up the header buttons completely.
const searchPattern = /<div className="flex gap-3">[\s\S]*?<\/div>\s*<\/div>\s*<div className="flex flex-1 gap-6 min-h-0">/;
const replacement = `
        <div className="flex gap-3">
          {/* Multiplayer Toggle */}
          <button 
            onClick={() => setIsMultiplayer(!isMultiplayer)}
            className={\`px-4 py-3 rounded-xl text-sm font-bold border flex items-center gap-2 transition-all shadow-lg \${isMultiplayer ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'}\`}
          >
            <span className="text-xl">🌍</span> {isMultiplayer ? 'Live Session (3)' : 'Team einladen'}
          </button>

          <button 
            onClick={() => setShowApiModal(true)}
            className="px-6 py-3 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all shadow-lg border border-slate-700 flex items-center gap-2 hover:border-blue-500/50"
          >
            🔌 API Export
          </button>
          <button 
            onClick={runFlow}
            disabled={isRunning}
            className={\`px-8 py-3 rounded-xl font-black transition-all shadow-lg flex items-center gap-2 \${isRunning ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/30 hover:scale-105'}\`}
          >
            {isRunning ? (
              <><div className="w-5 h-5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div> Sequenz läuft...</>
            ) : (
              <>▶ Flow starten</>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">`;

content = content.replace(searchPattern, replacement);
fs.writeFileSync('src/components/FlowBuilder.jsx', content, 'utf8');
console.log('Fixed Header buttons');
