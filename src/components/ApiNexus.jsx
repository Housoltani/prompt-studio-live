import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { soundEngine } from '../utils/SoundEngine';

export default function ApiNexus() {
  const [apiKey, setApiKey] = useState('***********************************');
  const [isRevealed, setIsRevealed] = useState(false);

  const mockFlows = [
    { id: 'f-891', name: 'SEO Blog Post Pipeline', endpoint: '/v1/flows/execute/f-891', calls: 142 },
    { id: 'f-223', name: 'Instagram Reel Generator', endpoint: '/v1/flows/execute/f-223', calls: 890 }
  ];

  const toggleKey = () => {
    soundEngine.playPop();
    if (isRevealed) {
      setApiKey('***********************************');
      setIsRevealed(false);
    } else {
      setApiKey('ps_live_sk_94bx289fjf902nf09nf30');
      setIsRevealed(true);
      toast('API Key freigeschaltet. Behandle ihn wie einen Sicherheitscode.', { icon: '🔐' });
    }
  };

  const copyKey = () => {
    if (!isRevealed) {
      toast.error('Schalte den Key erst frei!');
      return;
    }
    navigator.clipboard.writeText(apiKey);
    soundEngine.playSuccess();
    toast.success('API Key in die Zwischenablage kopiert!');
  };

  return (
    <div className="max-w-7xl animate-fade-in mx-auto mt-4 px-4 pb-12">
      
      {/* HEADER */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            Developer Preview
          </div>
          <h2 className="text-5xl font-black mb-2 text-white tracking-tight">
            🔌 API Nexus
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Verbinde deine Flow Builder Pipelines mit Zapier, Make oder deinem eigenen Code. Mach Prompt Studio zur Engine für deine Apps.
          </p>
        </div>
        <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl border border-slate-600 transition-colors shadow-lg flex items-center gap-2 whitespace-nowrap">
          📖 Dokumentation ansehen
        </button>
      </div>

      {/* API KEY SECTION */}
      <div className="glass-panel p-8 rounded-[2rem] border border-emerald-500/30 bg-slate-900/80 shadow-[0_0_30px_rgba(16,185,129,0.1)] mb-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          🔑 Globaler API Schlüssel
        </h3>
        <p className="text-sm text-slate-400 mb-6 max-w-3xl">Dieser Schlüssel gewährt vollen Zugriff auf dein Konto und deine Credits. Veröffentliche ihn niemals in clientseitigem Code (Frontend).</p>
        
        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
          <div className="flex-1 flex bg-slate-950 border border-slate-700 rounded-xl overflow-hidden shadow-inner">
            <div className="bg-slate-900 text-slate-500 px-4 flex items-center font-mono text-sm border-r border-slate-800 font-bold uppercase tracking-widest">
              Bearer
            </div>
            <input 
              type="text" 
              readOnly 
              value={apiKey} 
              className={`w-full bg-transparent px-4 py-3 text-sm font-mono focus:outline-none ${isRevealed ? 'text-emerald-400 font-bold tracking-widest' : 'text-slate-500 tracking-[0.3em]'}`}
            />
          </div>
          <div className="flex gap-2">
            <button onClick={toggleKey} className="w-12 h-12 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl flex items-center justify-center border border-slate-600 transition-colors shadow-lg">
              {isRevealed ? '🙈' : '👁️'}
            </button>
            <button onClick={copyKey} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-colors flex items-center gap-2 whitespace-nowrap">
              📋 Kopieren
            </button>
          </div>
        </div>
      </div>

      {/* WEBHOOKS & FLOWS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Webhook List */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <h3 className="font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <span className="text-indigo-400">⚡</span> Aktive Flow Endpoints
          </h3>
          
          <div className="space-y-4">
            {mockFlows.map(flow => (
              <div key={flow.id} className="glass-card p-6 rounded-2xl border border-slate-700/50 bg-slate-900/50 hover:bg-slate-800/80 transition-colors cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-white font-bold text-lg mb-1 group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                    {flow.name} <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest border border-emerald-500/30">Aktiv</span>
                  </h4>
                  <div className="text-xs font-mono text-slate-500 bg-slate-950 px-3 py-1.5 rounded-md border border-slate-800 inline-block mt-2">
                    POST https://api.prompt-studio.live{flow.endpoint}
                  </div>
                </div>
                <div className="text-right flex md:flex-col items-center md:items-end justify-between w-full md:w-auto">
                  <div className="text-indigo-400 font-black text-xl">{flow.calls}</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Requests / Monat</div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-4 border-2 border-dashed border-slate-700 rounded-2xl text-slate-500 font-bold hover:text-white hover:border-indigo-500 hover:bg-indigo-500/10 transition-colors">
            + Neuen Flow im Builder als API exportieren
          </button>
        </div>

        {/* Code Snippets & n8n Guide */}
        <div className="flex flex-col gap-6">
          <h3 className="font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <span className="text-rose-400 font-black">n8n</span> Integration
          </h3>
          
          <div className="glass-panel p-6 rounded-2xl border border-rose-500/30 bg-[#0f172a] shadow-[0_0_30px_rgba(244,63,94,0.05)] relative overflow-hidden group h-full flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-orange-500"></div>
            
            {/* n8n Mini-Guide */}
            <div className="mb-6 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center">
                  <span className="text-rose-500 font-black text-sm">n8n</span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">HTTP Request Node</h4>
                  <p className="text-xs text-slate-400">Verbinde Prompt Studio in 3 Schritten</p>
                </div>
              </div>
              
              <ol className="space-y-4 text-xs text-slate-300">
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold flex-shrink-0">1</span>
                  <p>Wähle Methode <span className="font-mono text-blue-400 bg-blue-900/30 px-1 rounded">POST</span> und setze die Flow-URL (siehe links) als Endpoint.</p>
                </li>
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold flex-shrink-0">2</span>
                  <p>Füge unter "Headers" den Key <span className="font-mono text-slate-400">Authorization</span> mit dem Wert <span className="font-mono text-emerald-400">Bearer DEIN_API_KEY</span> hinzu.</p>
                </li>
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold flex-shrink-0">3</span>
                  <p>Sende deine Parameter unter "Body" (JSON) an den Flow und verarbeite die Antwort im nächsten n8n Node.</p>
                </li>
              </ol>
            </div>

            <div className="mt-auto">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">cURL Fallback</span>
              </div>
              <pre className="text-[10px] text-emerald-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto bg-slate-950 p-3 rounded-xl border border-slate-800/50 shadow-inner">
{`curl -X POST https://api.../f-891 \\
  -H "Authorization: Bearer sk_..." \\
  -d '{"topic": "Cyberpunk"}'`}
              </pre>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}