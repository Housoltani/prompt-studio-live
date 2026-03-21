const fs = require('fs');

let content = fs.readFileSync('src/components/NotebookLM.jsx', 'utf8');

// 1. Add new state for the advanced features
const newStates = `
  const [podcastConfig, setPodcastConfig] = useState({ hosts: 2, tone: 'casual', focus: '' });
  const [showFlowModal, setShowFlowModal] = useState(false);
  const [showStyleModal, setShowStyleModal] = useState(false);
`;
content = content.replace(/const \[isGeneratingPodcast, setIsGeneratingPodcast\] = useState\(false\);/, 'const [isGeneratingPodcast, setIsGeneratingPodcast] = useState(false);\n' + newStates);

// 2. Add YouTube to upload dummy
const uploadLogic = `
  const handleUpload = () => {
    soundEngine.playClick();
    toast.success('Quelle hinzugefügt und zur Analyse eingereiht.');
    
    // Simulate detecting a YouTube URL or Image for style extraction
    const isYoutube = Math.random() > 0.5;
    const newSource = isYoutube 
      ? { id: Date.now(), name: 'Midjourney v6 Masterclass (YouTube)', type: 'video', status: 'processing', size: '12:45' }
      : { id: Date.now(), name: 'Client_Briefing_Q3.pdf', type: 'pdf', status: 'processing', size: '1.8 MB' };
      
    setSources([...sources, newSource]);
    
    setTimeout(() => {
      setSources(prev => prev.map(s => s.status === 'processing' ? { ...s, status: 'ready' } : s));
      soundEngine.playSuccess();
      toast.success('Analyse abgeschlossen. Transcript & Meta-Daten extrahiert.');
    }, 3000);
  };
`;
// Replace the old handleUpload
content = content.replace(/const handleUpload = \(\) => \{[\s\S]*?3000\);\n  \};/, uploadLogic);

// 3. Update the source icons to support video/youtube
const sourceIcons = `
                <div className={\`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 \${source.type === 'pdf' ? 'bg-red-500/20 text-red-400' : source.type === 'video' ? 'bg-rose-500/20 text-rose-400' : 'bg-blue-500/20 text-blue-400'}\`}>
                  {source.type === 'pdf' ? '📄' : source.type === 'video' ? '▶️' : '🔗'}
                </div>
`;
content = content.replace(/<div className=\{\`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 \$\{source\.type === 'pdf' \? 'bg-red-500\/20 text-red-400' : 'bg-blue-500\/20 text-blue-400'\}\`\}>[\s\S]*?<\/div>/, sourceIcons);

// 4. Update the Action Buttons under the sources list (Flow & Style Generators)
const sourceActions = `
          <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
             <button onClick={() => setShowFlowModal(true)} className="w-full py-2 bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/30 text-emerald-400 text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
               ⚡ Auto-Flow generieren
             </button>
             <button onClick={() => setShowStyleModal(true)} className="w-full py-2 bg-fuchsia-600/20 hover:bg-fuchsia-600/40 border border-fuchsia-500/30 text-fuchsia-400 text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
               🎨 Style-Guide extrahieren
             </button>
             <button className="w-full py-2 mt-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm font-bold rounded-xl transition-colors">
               Quellen verwalten
             </button>
          </div>
`;
content = content.replace(/<div className="mt-4 pt-4 border-t border-slate-800">[\s\S]*?<\/div>/, sourceActions);


// 5. Update the Podcast Tab with Tuning Console
const podcastTuning = `
          {/* PODCAST TAB */}
          {activeTab === 'podcast_player' && (
            <div className="flex-1 flex flex-col p-8 overflow-y-auto">
               
               {/* TUNING CONSOLE */}
               <div className="mb-8 bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
                 <h4 className="text-white font-bold mb-4 flex items-center gap-2">🎛️ Podcast Regie-Pult</h4>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div>
                     <label className="text-xs font-bold text-slate-400 mb-2 block">Anzahl Hosts</label>
                     <select value={podcastConfig.hosts} onChange={e => setPodcastConfig({...podcastConfig, hosts: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-sm text-slate-300 focus:outline-none focus:border-purple-500">
                       <option value={1}>1 (Monolog / Essay)</option>
                       <option value={2}>2 (Klassischer Dialog)</option>
                       <option value={3}>3 (Panel Diskussion)</option>
                     </select>
                   </div>
                   <div>
                     <label className="text-xs font-bold text-slate-400 mb-2 block">Tonfall / Vibe</label>
                     <select value={podcastConfig.tone} onChange={e => setPodcastConfig({...podcastConfig, tone: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-sm text-slate-300 focus:outline-none focus:border-purple-500">
                       <option value="casual">Locker & Humorvoll</option>
                       <option value="professional">Seriös & Akademisch</option>
                       <option value="technical">Technischer Deep Dive</option>
                       <option value="critical">Kritisch hinterfragend</option>
                     </select>
                   </div>
                   <div>
                     <label className="text-xs font-bold text-slate-400 mb-2 block">Fokus (Optional)</label>
                     <input 
                       type="text" 
                       value={podcastConfig.focus}
                       onChange={e => setPodcastConfig({...podcastConfig, focus: e.target.value})}
                       placeholder="z.B. Fokus auf Midjourney v6..." 
                       className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-sm text-slate-300 focus:outline-none focus:border-purple-500"
                     />
                   </div>
                 </div>
                 <div className="mt-4 flex justify-end">
                   <button onClick={handleGeneratePodcast} disabled={isGeneratingPodcast} className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-purple-500/20">
                     {isGeneratingPodcast ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span> : '🔄'}
                     {isGeneratingPodcast ? 'Rendere Audio...' : 'Podcast mit Setup generieren'}
                   </button>
                 </div>
               </div>

               {/* AUDIO PLAYER */}
               <div className="w-full max-w-2xl mx-auto bg-slate-950 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group shadow-2xl">
                 <div className="absolute inset-0 opacity-20 flex items-end justify-center gap-1 pb-10">
                   {[...Array(16)].map((_, i) => (
                     <div key={i} className="w-3 bg-purple-500 rounded-t-sm transition-all duration-300" style={{ height: \`\${Math.random() * 60 + 10}%\` }}></div>
                   ))}
                 </div>
                 
                 <div className="relative z-10 text-center">
                   <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(147,51,234,0.4)] mb-6">
                     🎙️
                   </div>
                   <h3 className="text-2xl font-black text-white mb-2">Deep Dive: Prompt Engineering & KI-Trends</h3>
                   <p className="text-slate-400 mb-8">{podcastConfig.hosts} Hosts • {podcastConfig.tone === 'casual' ? 'Humorvoll' : 'Professionell'} • 12:45 Min</p>
                   
                   <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 flex items-center gap-4">
                     <button className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center pl-1 hover:scale-105 transition-transform shadow-lg">
                       ▶️
                     </button>
                     <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden cursor-pointer">
                       <div className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                     </div>
                     <span className="text-xs font-mono text-slate-400">04:12</span>
                   </div>
                 </div>
               </div>
            </div>
          )}
`;
// Replace old podcast tab
content = content.replace(/{\/\* PODCAST TAB \*\/}........*?{activeTab === 'podcast_player' && \([\s\S]*?{\/\* NOTES TAB \*\//, podcastTuning + "\n          {/* NOTES TAB */");


// 6. Modals for Flow & Style
const modals = `
      {/* AUTO-FLOW MODAL */}
      {showFlowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowFlowModal(false)}></div>
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl animate-scale-in">
            <button onClick={() => setShowFlowModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">⚡</div>
              <h3 className="text-2xl font-black text-white mb-2">Flow Generator</h3>
              <p className="text-slate-400 text-sm">Die KI analysiert dein Briefing-PDF und baut automatisch eine passende Pipeline im Flow Builder.</p>
            </div>
            <button onClick={() => { 
              setShowFlowModal(false); 
              toast.success('Pipeline generiert! Wechsle zum Flow Builder.', { icon: '🚀' }); 
              soundEngine.playTransform();
            }} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg">
              Workflow aus PDF extrahieren
            </button>
          </div>
        </div>
      )}

      {/* STYLE GUIDE MODAL */}
      {showStyleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowStyleModal(false)}></div>
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl animate-scale-in">
            <button onClick={() => setShowStyleModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-fuchsia-500/20 text-fuchsia-400 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🎨</div>
              <h3 className="text-2xl font-black text-white mb-2">Style-Clone</h3>
              <p className="text-slate-400 text-sm">Extrahiere Farben, Beleuchtung und Kameraführung aus deinen Quellen als globalen Parameter für den Live Generator.</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
              <p className="text-xs text-slate-500 mb-2 font-mono">Generierter Parameter:</p>
              <p className="text-sm text-fuchsia-400 font-mono break-all">--style raw --v 6.0 --ar 16:9 --c 5 "Neon Cyberpunk, Volumetric Fog, 35mm lens"</p>
            </div>
            <button onClick={() => { 
              setShowStyleModal(false); 
              toast.success('Style-Guide in Live Generator Persona gespeichert!', { icon: '✨' }); 
              soundEngine.playSuccess();
            }} className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg">
              Als Persona speichern
            </button>
          </div>
        </div>
      )}
`;

content = content.replace("    </div>\n  );\n}", modals + "\n    </div>\n  );\n}");

fs.writeFileSync('src/components/NotebookLM.jsx', content, 'utf8');

