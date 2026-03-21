import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SideHustleRadar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const trends = [
    {
      id: 1,
      title: 'Faceless YouTube Channels',
      category: 'video',
      difficulty: 'Medium',
      potential: 'Hoch',
      roi: '€€€',
      description: 'Erstelle automatisierte Nischenkanäle (z.B. Philosophie, Gruselgeschichten) komplett mit KI-Stimmen und Stock-Material.',
      tools: ['AI Storyboard', 'Video Generator', 'Voice Avatar'],
      icon: '🎥',
      color: 'from-rose-500 to-orange-500',
      actionRoute: '/app/storyboard'
    },
    {
      id: 2,
      title: 'Amazon KDP Kinderbücher',
      category: 'publishing',
      difficulty: 'Leicht',
      potential: 'Mittel',
      roi: '€€',
      description: 'Generiere süße Illustrationen mit Midjourney und schreibe herzerwärmende Geschichten mit ChatGPT für den Amazon Kindle Store.',
      tools: ['E-Book Studio', 'Live Generator'],
      icon: '📚',
      color: 'from-emerald-400 to-cyan-500',
      actionRoute: '/app/ebook-studio'
    },
    {
      id: 3,
      title: 'AI Stock Photos',
      category: 'images',
      difficulty: 'Leicht',
      potential: 'Mittel',
      roi: '€€',
      description: 'Erstelle fotorealistische, hochauflösende Bilder für Adobe Stock oder Freepik und verdiene passiv an Downloads.',
      tools: ['Live Generator', 'Image Library'],
      icon: '🖼️',
      color: 'from-blue-500 to-indigo-600',
      actionRoute: '/app/generator'
    },
    {
      id: 4,
      title: 'PromptBase Selling',
      category: 'prompts',
      difficulty: 'Schwer',
      potential: 'Hoch',
      roi: '€€€',
      description: 'Entwickle und verkaufe hochkomplexe, spezialisierte Prompts für Midjourney, Claude oder ChatGPT auf Marktplätzen.',
      tools: ['Prompt Mixer', 'Flow Builder'],
      icon: '💡',
      color: 'from-purple-500 to-fuchsia-600',
      actionRoute: '/app/marketplace'
    },
    {
      id: 5,
      title: 'KI Musik Label',
      category: 'audio',
      difficulty: 'Medium',
      potential: 'Extrem',
      roi: '€€€€',
      description: 'Produziere Lofi-Beats oder Synthwave Tracks mit Suno/Udio und veröffentliche sie auf Spotify & Apple Music.',
      tools: ['Music Generator'],
      icon: '🎵',
      color: 'from-pink-500 to-rose-600',
      actionRoute: '/app/music'
    }
  ];

  const filteredTrends = activeTab === 'all' ? trends : trends.filter(t => t.category === activeTab);

  return (
    <div className="animate-fade-in p-6 max-w-7xl mx-auto text-slate-200">
      
      {/* Header */}
      <div className="mb-10 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 blur-3xl -z-10 rounded-full"></div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 drop-shadow-sm">
          Side-Hustle Radar
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Entdecke die lukrativsten KI-Monetarisierungs-Strategien in Echtzeit. Wähle deinen Pfad und starte sofort mit der Umsetzung.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {['all', 'video', 'publishing', 'images', 'prompts', 'audio'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
              activeTab === cat 
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-700 hover:border-slate-600'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrends.map(trend => (
          <div 
            key={trend.id}
            className="group relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden hover:border-slate-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col"
          >
            {/* Glowing top line */}
            <div className={`h-1 w-full bg-gradient-to-r ${trend.color}`}></div>
            
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="text-4xl">{trend.icon}</div>
                <div className="flex flex-col gap-1 items-end">
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Aufwand: {trend.difficulty}
                  </span>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                    ROI: {trend.roi}
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                {trend.title}
              </h3>
              <p className="text-sm text-slate-400 mb-6 flex-grow leading-relaxed">
                {trend.description}
              </p>
              
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Benötigte Tools:</h4>
                <div className="flex flex-wrap gap-2">
                  {trend.tools.map(tool => (
                    <span key={tool} className="text-[10px] px-2 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => navigate(trend.actionRoute)}
                className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all duration-300 transform group-hover:scale-[1.02] bg-gradient-to-r ${trend.color} hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]`}
              >
                Jetzt umsetzen
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default SideHustleRadar;
