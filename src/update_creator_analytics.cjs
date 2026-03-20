const fs = require('fs');
let content = fs.readFileSync('src/components/AuthProfile.jsx', 'utf8');

const analyticsSection = `
        {/* PHASE 2: CREATOR ANALYTICS DASHBOARD */}
        {!isEditing && (
          <div className="mt-12 bg-slate-900 border border-slate-700/50 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group mb-12">
            {/* Grid background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                📊
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">Creator Analytics</h3>
                <p className="text-slate-400 text-sm">Deine Performance auf dem Marktplatz</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-8">
              <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 hover:border-emerald-500/50 transition-colors">
                <p className="text-slate-400 text-sm mb-2 font-medium">Umsatz (Dieser Monat)</p>
                <div className="text-4xl font-black text-emerald-400">4,250 <span className="text-xl">⚡</span></div>
                <p className="text-emerald-500 text-xs mt-2 flex items-center gap-1">↑ 12% vs. letzter Monat</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 hover:border-blue-500/50 transition-colors">
                <p className="text-slate-400 text-sm mb-2 font-medium">Prompt-Kopien</p>
                <div className="text-4xl font-black text-blue-400">12,840</div>
                <p className="text-blue-500 text-xs mt-2 flex items-center gap-1">🔥 Top 5% Creator</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 hover:border-purple-500/50 transition-colors">
                <p className="text-slate-400 text-sm mb-2 font-medium">Top Modell</p>
                <div className="text-3xl font-black text-purple-400 truncate">Midjourney v6</div>
                <p className="text-slate-400 text-xs mt-2">Bringt dir 68% deiner Sparks</p>
              </div>
            </div>

            {/* Top Prompts Table */}
            <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800/50 relative z-10">
              <h4 className="text-white font-bold mb-4">Deine Bestseller-Prompts</h4>
              <div className="flex flex-col gap-3">
                {[
                  { name: 'Cinematic Cyberpunk Porträt', sales: 450, sparks: 2250, model: 'MJ v6' },
                  { name: 'Epic Orchestral Trailer Music', sales: 310, sparks: 1550, model: 'Suno v3.5' },
                  { name: 'Sora FPV Drone Run', sales: 90, sparks: 450, model: 'Sora 2' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-800/50 rounded-xl transition-colors border border-transparent hover:border-slate-700/50">
                    <div>
                      <div className="text-white font-medium text-sm">{item.name}</div>
                      <div className="text-slate-500 text-xs">{item.model}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 font-bold text-sm">+{item.sparks} ⚡</div>
                      <div className="text-slate-500 text-xs">{item.sales} Verkäufe</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
`;

const anchor = "{/* PORTFOLIO TABS */}";
if (content.includes(anchor)) {
  content = content.replace(anchor, analyticsSection + "\\n\\n          " + anchor);
  fs.writeFileSync('src/components/AuthProfile.jsx', content, 'utf8');
  console.log('Success: Injected Analytics into AuthProfile.jsx');
} else {
  console.log('Could not find anchor.');
}
