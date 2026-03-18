import React from 'react';
import { toast } from 'react-hot-toast';

export default function AITrendsRadar() {
  const modelsData = [
    { name: 'Sora 2', category: 'Video', trend: '+140%', color: 'blue', desc: 'Dominates text-to-video usage this week.' },
    { name: 'Midjourney v6', category: 'Image', trend: '+12%', color: 'fuchsia', desc: 'Steady growth, still industry standard.' },
    { name: 'Claude 3.5', category: 'Text', trend: '+85%', color: 'orange', desc: 'Taking over complex reasoning tasks.' },
    { name: 'Suno v3.5', category: 'Audio', trend: '+210%', color: 'yellow', desc: 'Explosive growth in viral pop generation.' },
  ];

  const newsFeeds = [
    { id: 1, source: 'OpenAI Blog', title: 'GPT-5 Release Window Leaked', date: 'Vor 2 Stunden', tag: 'Breaking' },
    { id: 2, source: 'Midjourney', title: 'v6.5 Update: Perfect Hands & Text Rendering', date: 'Gestern', tag: 'Update' },
    { id: 3, source: 'Community', title: 'Neuer Jailbreak für Grok 4 entdeckt', date: 'Vor 5 Stunden', tag: 'Exploit' },
  ];

  return (
    <div className="max-w-7xl animate-fade-in mx-auto mt-4 px-4 pb-12">
      
      {/* HEADER */}
      <div className="mb-10 text-center relative overflow-hidden glass-panel p-10 rounded-[2.5rem] border border-cyan-500/30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-3xl mb-6 mx-auto shadow-[0_0_30px_rgba(6,182,212,0.4)] animate-pulse">
            📡
          </div>
          <h2 className="text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
            KI-Radar & News
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Bleib dem Algorithmus einen Schritt voraus. Live-Trends, Model-Updates und die heißesten Prompts der Woche.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMN 1: TRENDING MODELS */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          <h3 className="font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <span className="text-cyan-400">⚡</span> Top Modelle (7 Tage)
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {modelsData.map((model, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-700/50 hover:border-slate-500 transition-colors group cursor-pointer relative overflow-hidden">
                <div className="absolute top-4 right-4 text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
                  {model.trend}
                </div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">{model.category}</div>
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{model.name}</h4>
                <p className="text-sm text-slate-400">{model.desc}</p>
                
                {/* Visual Graph Line */}
                <div className="mt-4 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r from-${model.color}-500 to-cyan-500`} style={{ width: `${Math.random() * 50 + 50}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* HOT PROMPTS SECTION */}
          <div className="mt-6 glass-panel p-6 rounded-[2rem] border border-slate-700/50">
            <h3 className="font-black text-white text-xl mb-6 flex items-center gap-2">
              🔥 Trending Prompts
            </h3>
            <div className="space-y-3">
              {[
                { title: 'Cyberpunk Produktfotografie (Sneaker)', tool: 'Midjourney' },
                { title: 'Anime Opening Sequenz (Drohnenflug)', tool: 'Kling 3.0' },
                { title: 'Lofi HipHop Generator Template', tool: 'Suno' },
              ].map((prompt, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-slate-900/50 rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer border border-slate-800 hover:border-slate-600">
                  <div className="flex items-center gap-3">
                    <div className="text-xl opacity-80">{idx === 0 ? '👟' : idx === 1 ? '🎬' : '🎧'}</div>
                    <div className="font-bold text-slate-200">{prompt.title}</div>
                  </div>
                  <div className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded font-bold uppercase">
                    {prompt.tool}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* COLUMN 2: BREAKING NEWS & ALERTS */}
        <div className="flex flex-col gap-6">
          <h3 className="font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <span className="text-red-400">📰</span> Breaking News
          </h3>
          
          <div className="glass-panel p-6 rounded-3xl border border-slate-700/50 bg-slate-900/80 shadow-2xl space-y-6">
            {newsFeeds.map(news => (
              <div key={news.id} className="group cursor-pointer border-b border-slate-800/50 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{news.source}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${news.tag === 'Breaking' ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' : news.tag === 'Update' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'}`}>
                    {news.tag}
                  </span>
                </div>
                <h4 className="text-white font-bold mb-2 group-hover:text-blue-400 transition-colors leading-snug">{news.title}</h4>
                <div className="text-xs text-slate-500">{news.date}</div>
              </div>
            ))}
          </div>

          <div className="glass-card p-6 rounded-3xl border border-blue-500/30 bg-blue-900/10 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="text-3xl mb-3">📬</div>
              <h4 className="text-white font-bold mb-2">Matrix Newsletter</h4>
              <p className="text-xs text-slate-400 mb-4">Erhalte die wichtigsten Updates und geheimen Prompts wöchentlich direkt in deine Kommando-Zentrale.</p>
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-2 rounded-xl transition-colors shadow-lg">
                Radar abonnieren
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}