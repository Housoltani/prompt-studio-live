import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function CreatorDashboard() {
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto mt-4 pb-16 animate-fade-in relative z-10">
      <div className="bg-slate-900 border border-slate-700/50 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        
        <div className="flex items-center gap-6 mb-12 relative z-10 border-b border-slate-800 pb-8">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-3xl flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            📊
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">{t?.tabs?.analytics || 'Creator Dashboard'}</h1>
            <p className="text-slate-400 text-lg mt-1">Überwache deine Verkäufe, Tantiemen und Top-Prompts in Echtzeit.</p>
          </div>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-12">
          <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 hover:border-emerald-500/50 transition-all hover:-translate-y-1 shadow-lg">
            <p className="text-slate-400 text-sm mb-2 font-bold uppercase tracking-wider">Umsatz (Dieser Monat)</p>
            <div className="text-5xl font-black text-emerald-400">4,250 <span className="text-2xl">⚡</span></div>
            <p className="text-emerald-500 text-sm mt-3 flex items-center gap-1 font-bold">↑ 12% vs. letzter Monat</p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-lg">
            <p className="text-slate-400 text-sm mb-2 font-bold uppercase tracking-wider">Prompt-Kopien / Verkäufe</p>
            <div className="text-5xl font-black text-blue-400">12,840</div>
            <p className="text-blue-500 text-sm mt-3 flex items-center gap-1 font-bold">🔥 Top 5% aller Creator</p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 hover:border-purple-500/50 transition-all hover:-translate-y-1 shadow-lg">
            <p className="text-slate-400 text-sm mb-2 font-bold uppercase tracking-wider">Bestes Modell</p>
            <div className="text-4xl font-black text-purple-400 truncate">Midjourney v6</div>
            <p className="text-slate-400 text-sm mt-3">Verantwortlich für 68% deiner Einnahmen</p>
          </div>
        </div>

        {/* TOP PROMPTS TABLE */}
        <div className="bg-slate-950/50 rounded-3xl p-8 border border-slate-800 relative z-10 shadow-inner">
          <h4 className="text-white font-black text-2xl mb-6 flex items-center gap-3">
            <span className="text-amber-400">👑</span> Deine Bestseller-Prompts
          </h4>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="pb-4 pt-2 px-4 text-slate-400 font-bold uppercase tracking-wider text-xs">Prompt Titel</th>
                  <th className="pb-4 pt-2 px-4 text-slate-400 font-bold uppercase tracking-wider text-xs">Modell</th>
                  <th className="pb-4 pt-2 px-4 text-slate-400 font-bold uppercase tracking-wider text-xs text-right">Verkäufe</th>
                  <th className="pb-4 pt-2 px-4 text-slate-400 font-bold uppercase tracking-wider text-xs text-right">Sparks ⚡</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {[
                  { name: 'Cinematic Cyberpunk Porträt', sales: 450, sparks: 2250, model: 'Midjourney v6', icon: '🎨' },
                  { name: 'Epic Orchestral Trailer Music', sales: 310, sparks: 1550, model: 'Suno v3.5', icon: '🎵' },
                  { name: 'Sora FPV Drone Run', sales: 90, sparks: 450, model: 'Sora 2', icon: '🎥' },
                  { name: 'Master SEO Blog Post', sales: 45, sparks: 120, model: 'GPT-4o', icon: '📝' },
                  { name: 'Dark Fantasy Creature Design', sales: 32, sparks: 96, model: 'Stable Diffusion', icon: '🎨' }
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sm">{item.icon}</div>
                        <span className="text-white font-bold group-hover:text-emerald-400 transition-colors">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-400 text-sm">
                      <span className="bg-slate-900 border border-slate-700 px-2 py-1 rounded text-xs">{item.model}</span>
                    </td>
                    <td className="py-4 px-4 text-right text-slate-300 font-mono">
                      {item.sales}
                    </td>
                    <td className="py-4 px-4 text-right text-emerald-400 font-black font-mono">
                      +{item.sparks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
             <button className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
               Sparks auszahlen (Auszahlung anfordern)
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
