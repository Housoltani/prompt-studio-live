import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCredits } from '../context/CreditsContext';
import { Link } from 'react-router-dom';

export default function CommandDashboard() {
  const { t } = useLanguage();
  const { credits } = useCredits();

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-20 mt-4 px-4">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-2 tracking-tight">
            Willkommen zurück, Creator.
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Dein System ist bereit. Du hast <span className="text-amber-400 font-bold">{credits} Sparks</span> zur Verfügung. Was erschaffen wir heute?
          </p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link to="/app/live" className="bg-slate-900 border border-slate-700 hover:border-blue-500 p-6 rounded-3xl transition-all hover:-translate-y-1 shadow-lg group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full group-hover:bg-blue-500/20 transition-colors"></div>
          <div className="text-3xl mb-4">✨</div>
          <h3 className="font-bold text-white mb-1">Live Generator</h3>
          <p className="text-xs text-slate-400">Direkt Bilder, Video & Text erschaffen.</p>
        </Link>
        <Link to="/app/flows" className="bg-slate-900 border border-slate-700 hover:border-emerald-500 p-6 rounded-3xl transition-all hover:-translate-y-1 shadow-lg group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full group-hover:bg-emerald-500/20 transition-colors"></div>
          <div className="text-3xl mb-4">⚡</div>
          <h3 className="font-bold text-white mb-1">Flow Builder</h3>
          <p className="text-xs text-slate-400">Verkette KIs zu einer Automatisierung.</p>
        </Link>
        <Link to="/app/images" className="bg-slate-900 border border-slate-700 hover:border-fuchsia-500 p-6 rounded-3xl transition-all hover:-translate-y-1 shadow-lg group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-fuchsia-500/10 rounded-bl-full group-hover:bg-fuchsia-500/20 transition-colors"></div>
          <div className="text-3xl mb-4">🖼️</div>
          <h3 className="font-bold text-white mb-1">Prompt Bibliothek</h3>
          <p className="text-xs text-slate-400">Top-Prompts für Midjourney & Co.</p>
        </Link>
        <Link to="/app/notebook" className="bg-slate-900 border border-slate-700 hover:border-purple-500 p-6 rounded-3xl transition-all hover:-translate-y-1 shadow-lg group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-bl-full group-hover:bg-purple-500/20 transition-colors"></div>
          <div className="text-3xl mb-4">📚</div>
          <h3 className="font-bold text-white mb-1">Notebook LM</h3>
          <p className="text-xs text-slate-400">Analysiere Dokumente & PDFs.</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* RECENT GENERATIONS */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-white text-lg">Letzte Meisterwerke</h3>
            <Link to="/app/studio" className="text-sm text-blue-400 hover:text-blue-300">Alle ansehen →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-800 border border-slate-700 hover:border-blue-500 transition-colors cursor-pointer">
              <img src="https://picsum.photos/seed/cyber/400/300" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-950 to-transparent">
                <p className="text-xs font-bold text-white truncate">Neon Cityscape</p>
                <p className="text-[10px] text-emerald-400">Midjourney v6</p>
              </div>
            </div>
            <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-800 border border-slate-700 hover:border-blue-500 transition-colors cursor-pointer">
              <img src="https://picsum.photos/seed/drone/400/300" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-2 right-2 bg-slate-900/80 px-2 py-0.5 rounded text-[10px] text-white">🎥 0:12</div>
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-950 to-transparent">
                <p className="text-xs font-bold text-white truncate">FPV Canyon Run</p>
                <p className="text-[10px] text-emerald-400">Sora 2</p>
              </div>
            </div>
            <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-800 border border-slate-700 hover:border-blue-500 transition-colors cursor-pointer">
              <img src="https://picsum.photos/seed/music/400/300" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl">▶</div>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-950 to-transparent">
                <p className="text-xs font-bold text-white truncate">Cyber Synthwave</p>
                <p className="text-[10px] text-emerald-400">Suno v3.5</p>
              </div>
            </div>
          </div>
        </div>

        {/* TRENDING COMMUNITY & NEWS */}
        <div className="space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
            <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2"><span className="text-amber-400">🔥</span> Trending Workflows</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 hover:bg-slate-800/50 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-slate-700">
                <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center text-lg">📚</div>
                <div>
                  <p className="text-sm font-bold text-white">E-Book Automator</p>
                  <p className="text-xs text-slate-400">1.2k Kopien heute</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-slate-800/50 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-slate-700">
                <div className="w-10 h-10 bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center text-lg">📱</div>
                <div>
                  <p className="text-sm font-bold text-white">TikTok Viral Reel</p>
                  <p className="text-xs text-slate-400">840 Kopien heute</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-slate-800/50 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-slate-700">
                <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center text-lg">🤖</div>
                <div>
                  <p className="text-sm font-bold text-white">SEO Master Agent</p>
                  <p className="text-xs text-slate-400">520 Kopien heute</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
