import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCredits } from '../context/CreditsContext';
import { 
  communityPrompts as dummyPrompts 
} from '../data.js';

export default function Studio() {
  const { credits } = useCredits();
  const [activeTab, setActiveTab] = useState('prompts');

  const historyFeed = [
    { time: 'Vor 10 Min', text: 'Bild generiert mit Flux.1', icon: '🎨' },
    { time: 'Vor 2 Std', text: 'Prompt "SEO Experte" gespeichert', icon: '💾' },
    { time: 'Gestern', text: 'Sora 2 Video exportiert', icon: '🎬' },
  ];

  const dummyImages = [
    'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
    'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=400&q=80',
    'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=400&q=80'
  ];

  return (
    <div className="max-w-7xl animate-fade-in mx-auto mt-4 px-4 pb-12">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 tracking-tight">📂 Kommandozentrale</h2>
          <p className="text-slate-400 text-lg">Willkommen zurück in deinem Studio. Deine Ressourcen und Projekte auf einen Blick.</p>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="glass-card p-6 rounded-3xl border border-slate-700/50 shadow-lg relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-8xl opacity-5 group-hover:scale-110 transition-transform">⚡</div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Verfügbare Sparks</p>
          <p className="text-4xl font-black text-amber-400">{credits}</p>
        </div>
        <div className="glass-card p-6 rounded-3xl border border-slate-700/50 shadow-lg relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-8xl opacity-5 group-hover:scale-110 transition-transform">🤖</div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Lieblings-Modell</p>
          <p className="text-2xl font-black text-white mt-2">Kling 3.0</p>
        </div>
        <div className="glass-card p-6 rounded-3xl border border-slate-700/50 shadow-lg relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-8xl opacity-5 group-hover:scale-110 transition-transform">📝</div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Gespeicherte Prompts</p>
          <p className="text-4xl font-black text-blue-400">14</p>
        </div>
        <div className="glass-card p-6 rounded-3xl border border-slate-700/50 shadow-lg relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-8xl opacity-5 group-hover:scale-110 transition-transform">🎨</div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Generierte Medien</p>
          <p className="text-4xl font-black text-emerald-400">128</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Col: Quick Actions & History */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          <div className="glass-card p-6 rounded-3xl border border-slate-700/50">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">Schnellstart</h3>
            <div className="flex flex-col gap-3">
              <NavLink to="/app/generator" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-between group">
                <span className="flex items-center gap-2"><span>🎨</span> Live Generator</span>
                <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
              </NavLink>
              <NavLink to="/app/flows" className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-slate-900/50 flex items-center justify-between group">
                <span className="flex items-center gap-2"><span>⚡</span> Neuer Flow</span>
                <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
              </NavLink>
              <NavLink to="/app/credits" className="w-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-between group">
                <span className="flex items-center gap-2"><span>💎</span> Sparks aufladen</span>
                <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
              </NavLink>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-700/50 flex-1">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">Aktivität</h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-700 before:to-transparent">
              {historyFeed.map((item, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border border-slate-600 bg-slate-800 text-xs text-white shadow shrink-0 z-10 mr-3 md:mx-auto">
                    {item.icon}
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] glass-panel p-3 rounded-xl border border-slate-700">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-bold text-slate-300 text-sm">{item.text}</div>
                    </div>
                    <div className="text-xs text-slate-500 font-mono">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Media & Prompts Library */}
        <div className="lg:col-span-3 glass-panel rounded-[2.5rem] p-8 border border-slate-700/50 min-h-[600px] flex flex-col">
          
          <div className="flex gap-4 border-b border-slate-700/50 pb-4 mb-6">
            <button 
              onClick={() => setActiveTab('prompts')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'prompts' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
            >
              📝 Gespeicherte Prompts
            </button>
            <button 
              onClick={() => setActiveTab('media')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'media' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
            >
              🎨 Medien-Bibliothek
            </button>
          </div>

          <div className="flex-1">
            {activeTab === 'prompts' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                {dummyPrompts.slice(0,4).map(item => (
                  <div key={item.id} className="glass-card rounded-2xl p-5 relative group hover:-translate-y-1 transition-transform border border-slate-700/50 hover:border-blue-500/50">
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button className="p-1.5 bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">✏️</button>
                      <button className="p-1.5 bg-slate-800 rounded text-slate-400 hover:text-red-400 transition-colors">🗑️</button>
                    </div>
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1 block">Prompt</span>
                    <h4 className="font-bold text-white mb-3 pr-16">{item.title}</h4>
                    <p className="text-slate-400 text-sm line-clamp-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800 font-mono">{item.prompt}</p>
                  </div>
                ))}
                <div className="glass-card rounded-2xl p-5 border border-dashed border-slate-600 flex flex-col items-center justify-center text-slate-500 hover:border-slate-400 hover:text-slate-300 transition-colors cursor-pointer min-h-[160px]">
                  <span className="text-3xl mb-2">+</span>
                  <span className="font-bold">Neuen Prompt speichern</span>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
                {dummyImages.map((img, i) => (
                  <div key={i} className="group relative rounded-2xl overflow-hidden aspect-square border border-slate-700/50">
                    <img src={img} alt="Generated Asset" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-white bg-emerald-500/50 px-2 py-1 rounded backdrop-blur-sm">Flux.1</span>
                        <button className="text-white hover:text-blue-400">⬇️</button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="rounded-2xl border border-dashed border-slate-600 flex flex-col items-center justify-center text-slate-500 aspect-square hover:border-slate-400 transition-colors">
                  <span className="text-2xl mb-1">🖼️</span>
                  <span className="text-xs font-bold text-center px-2">Generator öffnen</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}