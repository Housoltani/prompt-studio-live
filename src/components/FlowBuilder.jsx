import React from 'react';
import { toast } from 'react-hot-toast';

export default function FlowBuilder() {
  const handlePlay = () => {
    toast.success('Flow "Viral TikTok" gestartet!', {
      icon: '⚡',
      style: { background: '#1e293b', color: '#fff' }
    });
  };

  return (
    <div className="max-w-6xl animate-fade-in mx-auto mt-4">
      <h2 className="text-3xl font-bold mb-2 text-gradient from-yellow-400 to-amber-500">⚡ Prompt Chains & Automatisierung</h2>
      <p className="text-slate-400 mb-8">Verknüpfe KI-Modelle. Lass GPT-4o die Idee schreiben und Runway das Video generieren – vollautomatisch.</p>

      <div className="flex gap-8 items-start">
        
        {/* Sidebar */}
        <div className="w-72 glass-panel rounded-3xl p-6 flex flex-col gap-4">
          <h3 className="font-bold text-slate-300 mb-2">Verfügbare Knoten</h3>
          <div className="bg-slate-800 hover:bg-slate-700 cursor-move border border-slate-600 rounded-xl p-3 flex items-center gap-3 transition-all">
            <span className="text-xl">✍️</span><span className="text-sm font-bold text-slate-200">Text Generator</span>
          </div>
          <div className="bg-slate-800 hover:bg-slate-700 cursor-move border border-slate-600 rounded-xl p-3 flex items-center gap-3 transition-all">
            <span className="text-xl">🖼️</span><span className="text-sm font-bold text-slate-200">Image Generator</span>
          </div>
          <div className="bg-slate-800 hover:bg-slate-700 cursor-move border border-slate-600 rounded-xl p-3 flex items-center gap-3 transition-all">
            <span className="text-xl">🎬</span><span className="text-sm font-bold text-slate-200">Video Generator</span>
          </div>
          <div className="bg-slate-800 hover:bg-slate-700 cursor-move border border-slate-600 rounded-xl p-3 flex items-center gap-3 transition-all">
            <span className="text-xl">🔊</span><span className="text-sm font-bold text-slate-200">Voice Over</span>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 glass-card border border-slate-700/50 rounded-3xl p-8 relative min-h-[600px] overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxLjUiIGZpbGw9IiMzMzQxNTUiPjwvY2lyY2xlPgo8L3N2Zz4=')]">
          
          <div className="absolute top-6 right-6 flex gap-4">
            <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-colors border border-slate-600 text-sm">Flow Speichern</button>
            <button onClick={handlePlay} className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-2 px-6 rounded-xl shadow-[0_0_20px_-5px_rgba(245,158,11,0.5)] transition-all flex items-center gap-2 text-sm">
              ▶ Flow Ausführen
            </button>
          </div>

          <h3 className="font-bold text-slate-400 mb-8 uppercase tracking-wider text-xs">Aktiver Flow: Viral TikTok</h3>

          {/* Node 1 */}
          <div className="absolute top-32 left-10 w-64 glass-panel border border-blue-500/50 rounded-2xl p-5 shadow-2xl z-10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-blue-400 uppercase">Input</span>
              <span className="text-lg">🤖</span>
            </div>
            <h4 className="font-bold text-slate-200 text-sm mb-2">GPT-4o (Idee)</h4>
            <p className="text-xs text-slate-400 font-mono bg-slate-900/80 p-2 rounded">Generiere ein Hook-Skript für ein 10s Video über Kaffeebohnen.</p>
            {/* Output Port */}
            <div className="w-3 h-3 bg-blue-500 rounded-full absolute top-1/2 -right-1.5 transform -translate-y-1/2 shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
          </div>

          {/* SVG Connection Line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <path d="M 310 180 C 400 180, 400 320, 500 320" fill="none" stroke="#475569" strokeWidth="3" strokeDasharray="5,5" className="animate-pulse" />
          </svg>

          {/* Node 2 */}
          <div className="absolute top-64 left-[500px] w-64 glass-panel border border-pink-500/50 rounded-2xl p-5 shadow-2xl z-10">
            {/* Input Port */}
            <div className="w-3 h-3 bg-pink-500 rounded-full absolute top-1/2 -left-1.5 transform -translate-y-1/2 shadow-[0_0_10px_rgba(236,72,153,1)]"></div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-pink-400 uppercase">Render</span>
              <span className="text-lg">🎬</span>
            </div>
            <h4 className="font-bold text-slate-200 text-sm mb-2">Runway Gen-3</h4>
            <p className="text-xs text-slate-400 font-mono bg-slate-900/80 p-2 rounded">{'{{ node.1.output }}'}</p>
          </div>

        </div>

      </div>
    </div>
  );
}