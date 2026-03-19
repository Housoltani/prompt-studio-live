import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useCredits } from '../context/CreditsContext';
import { useLanguage } from '../context/LanguageContext';

export default function ModelCompare() {
  const { t } = useLanguage();
  const { credits, spendCredits } = useCredits();
  const [prompt, setPrompt] = useState('A highly detailed cyberpunk sports car driving through a neon-lit futuristic city, cinematic lighting, 8k resolution');
  const [modelA, setModelA] = useState('image/kling-3');
  const [modelB, setModelB] = useState('image/sora-2');
  const [resultA, setResultA] = useState(null);
  const [resultB, setResultB] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCompare = () => {
    if (!prompt.trim()) return toast.error(t?.modelCompare?.missingPrompt || 'Prompt fehlt!');
    
    // Cost for a split-screen premium generation (2 models)
    if (!spendCredits(15, 'Split-Screen Render')) return;

    setLoading(true);
    setResultA(null);
    setResultB(null);
    toast.success(t?.modelCompare?.initText || 'Beide KI-Systeme initiieren Rendering...', { icon: '⚖️' });

    // Simulate concurrent generation
    setTimeout(() => {
      setResultA('https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=800&q=80');
      toast.success(`${modelA.split('/')[1].toUpperCase()} ist fertig!`);
    }, 2000);

    setTimeout(() => {
      setResultB('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80');
      toast.success(`${modelB.split('/')[1].toUpperCase()} ist fertig!`);
      setLoading(false);
    }, 3500);
  };

  const modelOptions = (
    <>
      <optgroup label="Visuelle KIs">
        <option value="image/kling-3">Kling 3.0 (Image)</option>
        <option value="image/sora-2">Sora 2 (Image)</option>
        <option value="image/flux-pro">Flux.1 Pro</option>
        <option value="image/midjourney-v6">Midjourney v6</option>
        <option value="image/seedream">Seedream v5</option>
      </optgroup>
      <optgroup label="Text KIs">
        <option value="text/gpt-4o">GPT-4o</option>
        <option value="text/claude-3-opus">Claude 3 Opus</option>
        <option value="text/nano-banana-pro">Nano Banana Pro</option>
      </optgroup>
    </>
  );

  return (
    <div className="max-w-7xl animate-fade-in mx-auto mt-4 px-4 pb-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 tracking-tight">⚖️ Die Arena</h2>
          <p className="text-slate-400 text-lg">Lass zwei High-End KI-Modelle simultan gegeneinander antreten.</p>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 mb-8 border border-slate-700/50 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 text-9xl opacity-5 pointer-events-none">⚔️</div>
        
        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          <textarea 
            value={prompt} onChange={(e) => setPrompt(e.target.value)}
            placeholder="Dein ultimativer Prompt für beide Modelle..."
            className="flex-1 min-h-[100px] bg-slate-900/80 border border-slate-700 rounded-2xl p-4 text-white focus:border-indigo-500 transition-colors resize-none font-mono text-sm custom-scrollbar"
          />
          <div className="flex flex-col gap-3 justify-end w-full md:w-48">
             <div className="text-xs text-center font-bold text-amber-500 bg-amber-500/10 py-1 rounded-lg border border-amber-500/20">⚡ 15 Sparks</div>
             <button 
                onClick={handleCompare} 
                disabled={loading} 
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
              {loading ? (
                 <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                <>⚔️ Rendern</>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Model A */}
        <div className="glass-card rounded-[2rem] p-6 flex flex-col h-full border border-slate-700/50 relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-t-[2rem]"></div>
          
          <div className="flex justify-between items-center mb-6">
            <span className="text-4xl font-black text-slate-800 absolute -left-4 top-4 select-none opacity-50">A</span>
            <select 
              value={modelA} 
              onChange={(e) => setModelA(e.target.value)} 
              className="bg-slate-900 border border-slate-600 text-white font-bold rounded-xl px-4 py-3 text-sm focus:border-blue-500 shadow-inner w-2/3"
            >
              {modelOptions}
            </select>
            <div className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/30">Challenger 1</div>
          </div>
          
          <div className="flex-1 bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden min-h-[300px] flex items-center justify-center relative shadow-inner group-hover:border-blue-500/30 transition-colors">
            {loading && !resultA && (
               <div className="flex flex-col items-center gap-3">
                 <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                 <span className="text-xs font-bold text-blue-400 animate-pulse tracking-widest uppercase">Synthesizing...</span>
               </div>
            )}
            {resultA && (
              <img src={resultA} alt="Model A Result" className="w-full h-full object-cover animate-fade-in" />
            )}
            {!loading && !resultA && (
              <span className="text-slate-600 font-bold opacity-50">Warten auf Signal...</span>
            )}
          </div>
        </div>

        {/* Model B */}
        <div className="glass-card rounded-[2rem] p-6 flex flex-col h-full border border-slate-700/50 relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-transparent rounded-t-[2rem]"></div>
          
          <div className="flex justify-between items-center mb-6">
            <span className="text-4xl font-black text-slate-800 absolute -right-4 top-4 select-none opacity-50">B</span>
            <select 
              value={modelB} 
              onChange={(e) => setModelB(e.target.value)} 
              className="bg-slate-900 border border-slate-600 text-white font-bold rounded-xl px-4 py-3 text-sm focus:border-indigo-500 shadow-inner w-2/3"
            >
              {modelOptions}
            </select>
            <div className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/30">Challenger 2</div>
          </div>
          
          <div className="flex-1 bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden min-h-[300px] flex items-center justify-center relative shadow-inner group-hover:border-indigo-500/30 transition-colors">
            {loading && !resultB && (
               <div className="flex flex-col items-center gap-3">
                 <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                 <span className="text-xs font-bold text-indigo-400 animate-pulse tracking-widest uppercase">Synthesizing...</span>
               </div>
            )}
            {resultB && (
              <img src={resultB} alt="Model B Result" className="w-full h-full object-cover animate-fade-in" />
            )}
            {!loading && !resultB && (
              <span className="text-slate-600 font-bold opacity-50">Warten auf Signal...</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}