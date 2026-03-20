const fs = require('fs');

let content = fs.readFileSync('src/components/FlowBuilder.jsx', 'utf8');

// The new state variables
const stateInject = `  const [showApiModal, setShowApiModal] = useState(false);`;
content = content.replace(/const \[isRunning, setIsRunning\] = useState\(false\);/, 'const [isRunning, setIsRunning] = useState(false);\n' + stateInject);

// The deploy button
const deployButton = `
        <div className="flex gap-3">
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
        </div>`;

// Replace the old header button block with the new one
const headerSearchPattern = /<button[\s\S]*?runFlow[\s\S]*?<\/button>/;
content = content.replace(headerSearchPattern, deployButton);

// The Modal JSX
const apiModal = `
      {/* API EXPORT MODAL */}
      {showApiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowApiModal(false)}></div>
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-2xl w-full relative z-10 shadow-2xl animate-scale-in">
            <button onClick={() => setShowApiModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">🔌</div>
              <div>
                <h3 className="text-2xl font-black text-white">API Endpoint Deployment</h3>
                <p className="text-slate-400 text-sm">Dein Flow ist nun als RESTful API erreichbar.</p>
              </div>
            </div>

            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 mb-6 font-mono text-sm overflow-x-auto relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => { navigator.clipboard.writeText("curl -X POST https://api.promptstudio.live/v1/flows/execute/flow_7a9b2c \\\\\\n  -H 'Authorization: Bearer YOUR_API_KEY' \\\\\\n  -H 'Content-Type: application/json' \\\\\\n  -d '{\\"inputs\\": {\\"prompt\\": \\"Eine epische Fantasy Landschaft\\"}}'"); toast.success("Kopiert!"); }} 
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-md text-xs border border-slate-700"
                >Kopieren</button>
              </div>
              <span className="text-pink-500">curl</span> <span className="text-yellow-300">-X POST</span> <span className="text-emerald-400">https://api.promptstudio.live/v1/flows/execute/flow_7a9b2c</span> \\<br/>
              &nbsp;&nbsp;<span className="text-yellow-300">-H</span> <span className="text-blue-300">'Authorization: Bearer YOUR_API_KEY'</span> \\<br/>
              &nbsp;&nbsp;<span className="text-yellow-300">-H</span> <span className="text-blue-300">'Content-Type: application/json'</span> \\<br/>
              &nbsp;&nbsp;<span className="text-yellow-300">-d</span> <span className="text-blue-300">'{'{'}"inputs": {'{'}"prompt": "Eine epische Fantasy Landschaft"{'}'}{'}'}'</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                <p className="text-slate-400 text-xs mb-1 font-bold">RATE LIMIT</p>
                <p className="text-white text-lg">120 Req / Minute</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                <p className="text-slate-400 text-xs mb-1 font-bold">KOSTEN PRO CALL</p>
                <p className="text-emerald-400 text-lg">~ 4 Sparks</p>
              </div>
            </div>

            <button onClick={() => setShowApiModal(false)} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors">
              Endpunkt verwalten
            </button>
          </div>
        </div>
      )}
`;

const anchorEnd = "    </div>\n  );\n}";
if (content.includes(anchorEnd)) {
  content = content.replace(anchorEnd, apiModal + "\n" + anchorEnd);
  fs.writeFileSync('src/components/FlowBuilder.jsx', content, 'utf8');
  console.log('API Export successfully injected into FlowBuilder.jsx');
} else {
  console.log('Could not find end of FlowBuilder.jsx');
}
