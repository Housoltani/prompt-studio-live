import React, { useState } from 'react';

export default function FlowBuilder() {
  const [nodes, setNodes] = useState([
    { id: 1, type: 'trigger', name: 'Start', color: 'slate' },
    { id: 2, type: 'action', name: 'Prompt Generator (GPT-4)', color: 'blue', desc: 'Erstellt einen detaillierten Bild-Prompt aus dem Thema.' },
    { id: 3, type: 'action', name: 'Bild-Generator (Midjourney)', color: 'fuchsia', desc: 'Generiert ein 16:9 Bild basierend auf dem Prompt.' },
    { id: 4, type: 'action', name: 'Video-Animator (Kling)', color: 'emerald', desc: 'Animiert das Bild zu einem 5-Sekunden Video.' }
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-20">
      
      {/* Header */}
      <div className="glass-panel p-8 rounded-3xl relative overflow-hidden border border-slate-700/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
              Flow <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Builder</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              Verbinde KI-Modelle zu automatisierten Workflows. Baue komplexe Pipelines, die per Knopfdruck Ideen in ganze Videoproduktionen verwandeln.
            </p>
          </div>
          
          <div className="flex bg-slate-900/50 p-1.5 rounded-xl border border-slate-700/50">
            <button className="px-5 py-2.5 rounded-lg font-bold text-sm bg-emerald-600 text-white shadow-lg flex items-center gap-2 hover:bg-emerald-500 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Flow ausführen
            </button>
            <button className="px-5 py-2.5 rounded-lg font-bold text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
              Speichern
            </button>
          </div>
        </div>
      </div>

      {/* Builder Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[70vh]">
        
        {/* Sidebar: Available Nodes */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-700/50 overflow-y-auto hidden lg:block bg-slate-800/40">
          <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-700/50 pb-4">Verfügbare Knoten</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-xs text-slate-400 font-bold mb-3 uppercase">Trigger</h4>
              <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl cursor-grab hover:border-slate-500 transition-colors flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-white">▶️</div>
                <span className="text-sm text-slate-300 font-bold">Manueller Start</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs text-blue-400 font-bold mb-3 uppercase">Text KI</h4>
              <div className="space-y-2">
                <div className="p-3 bg-slate-900 border border-blue-900/50 rounded-xl cursor-grab hover:border-blue-500/50 transition-colors flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-blue-900/50 flex items-center justify-center text-blue-400 font-black">G</div>
                  <span className="text-sm text-slate-300 font-bold">GPT-4 Turbo</span>
                </div>
                <div className="p-3 bg-slate-900 border border-indigo-900/50 rounded-xl cursor-grab hover:border-indigo-500/50 transition-colors flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-indigo-900/50 flex items-center justify-center text-indigo-400 font-black">C</div>
                  <span className="text-sm text-slate-300 font-bold">Claude 3.5 Sonnet</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs text-fuchsia-400 font-bold mb-3 uppercase">Bild KI</h4>
              <div className="space-y-2">
                <div className="p-3 bg-slate-900 border border-fuchsia-900/50 rounded-xl cursor-grab hover:border-fuchsia-500/50 transition-colors flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-fuchsia-900/50 flex items-center justify-center text-fuchsia-400 font-black">M</div>
                  <span className="text-sm text-slate-300 font-bold">Midjourney v6</span>
                </div>
                <div className="p-3 bg-slate-900 border border-purple-900/50 rounded-xl cursor-grab hover:border-purple-500/50 transition-colors flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-purple-900/50 flex items-center justify-center text-purple-400 font-black">D</div>
                  <span className="text-sm text-slate-300 font-bold">DALL-E 3</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs text-emerald-400 font-bold mb-3 uppercase">Video KI</h4>
              <div className="space-y-2">
                <div className="p-3 bg-slate-900 border border-emerald-900/50 rounded-xl cursor-grab hover:border-emerald-500/50 transition-colors flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-emerald-900/50 flex items-center justify-center text-emerald-400 font-black">K</div>
                  <span className="text-sm text-slate-300 font-bold">Kling Video</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="lg:col-span-3 bg-[#0f172a] rounded-3xl border border-slate-700/50 relative overflow-hidden flex flex-col items-center py-12" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(51, 65, 85, 0.4) 1px, transparent 0)', backgroundSize: '24px 24px' }}>
          
          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-lg p-2 flex gap-2 z-10">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg></button>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" /></svg></button>
          </div>

          <div className="w-full max-w-md space-y-4 relative z-0 pb-20">
            {nodes.map((node, index) => (
              <React.Fragment key={node.id}>
                {/* Visual Node */}
                <div className={`relative group p-6 rounded-2xl border bg-slate-900/90 backdrop-blur-md shadow-xl transition-all hover:scale-[1.02] cursor-pointer ${
                  node.color === 'slate' ? 'border-slate-600 shadow-[0_0_15px_rgba(71,85,105,0.2)]' :
                  node.color === 'blue' ? 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]' :
                  node.color === 'fuchsia' ? 'border-fuchsia-500/50 shadow-[0_0_20px_rgba(217,70,239,0.2)]' :
                  'border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${
                        node.color === 'slate' ? 'bg-slate-800 text-slate-300' :
                        node.color === 'blue' ? 'bg-blue-900/50 text-blue-400' :
                        node.color === 'fuchsia' ? 'bg-fuchsia-900/50 text-fuchsia-400' :
                        'bg-emerald-900/50 text-emerald-400'
                      }`}>
                        {index === 0 ? '▶️' : index}
                      </div>
                      <h3 className="text-lg font-bold text-white">{node.name}</h3>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                  {node.desc && <p className="text-slate-400 text-sm ml-13 pl-[52px]">{node.desc}</p>}
                </div>

                {/* Arrow & Plus button down to next node */}
                {index < nodes.length - 1 && (
                  <div className="flex flex-col items-center justify-center py-2 relative">
                    <div className="w-0.5 h-10 bg-slate-700"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 border border-slate-600 rounded-full w-8 h-8 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white cursor-pointer z-10 transition-colors shadow-lg">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    </div>
                    <div className="w-3 h-3 rotate-45 border-r-2 border-b-2 border-slate-700 -mt-1.5 bg-[#0f172a]"></div>
                  </div>
                )}
              </React.Fragment>
            ))}

            {/* Final Add Node Button */}
            <div className="flex flex-col items-center justify-center py-2 relative mt-4">
              <div className="w-0.5 h-10 bg-slate-700/50 border-dashed border-l-2"></div>
              <button className="mt-2 border-2 border-dashed border-slate-600 hover:border-emerald-500 bg-slate-900/50 hover:bg-emerald-900/20 text-slate-400 hover:text-emerald-400 font-bold py-4 px-8 rounded-2xl w-full transition-all flex items-center justify-center gap-2 group">
                <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                Neuen Knoten hinzufügen
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
