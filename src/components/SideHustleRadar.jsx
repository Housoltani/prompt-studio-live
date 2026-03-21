import React, { useState, useEffect } from 'react';
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
      potential: 85,
      demand: 92,
      roi: '€€€',
      description: 'Erstelle automatisierte Nischenkanäle komplett mit KI-Stimmen und Stock-Material.',
      tools: ['AI Storyboard', 'Video Generator', 'Voice Avatar'],
      icon: '🎥',
      color: 'from-green-500 to-emerald-500',
      actionRoute: '/app/storyboard',
      tickerSymbol: 'YTCHNL'
    },
    {
      id: 2,
      title: 'Amazon KDP Kinderbücher',
      category: 'publishing',
      difficulty: 'Leicht',
      potential: 65,
      demand: 78,
      roi: '€€',
      description: 'Generiere süße Illustrationen mit Midjourney und schreibe Geschichten mit ChatGPT.',
      tools: ['E-Book Studio', 'Live Generator'],
      icon: '📚',
      color: 'from-emerald-400 to-teal-500',
      actionRoute: '/app/ebook-studio',
      tickerSymbol: 'AMZKDP'
    },
    {
      id: 3,
      title: 'AI Stock Photos',
      category: 'images',
      difficulty: 'Leicht',
      potential: 55,
      demand: 88,
      roi: '€€',
      description: 'Erstelle fotorealistische Bilder für Adobe Stock oder Freepik.',
      tools: ['Live Generator', 'Image Library'],
      icon: '🖼️',
      color: 'from-teal-500 to-cyan-500',
      actionRoute: '/app/generator',
      tickerSymbol: 'STKIMG'
    },
    {
      id: 4,
      title: 'PromptBase Selling',
      category: 'prompts',
      difficulty: 'Schwer',
      potential: 95,
      demand: 82,
      roi: '€€€',
      description: 'Entwickle und verkaufe spezialisierte Prompts auf Marktplätzen.',
      tools: ['Prompt Mixer', 'Flow Builder'],
      icon: '💡',
      color: 'from-cyan-500 to-blue-500',
      actionRoute: '/app/marketplace',
      tickerSymbol: 'PRMPTX'
    },
    {
      id: 5,
      title: 'KI Musik Label',
      category: 'audio',
      difficulty: 'Medium',
      potential: 90,
      demand: 85,
      roi: '€€€€',
      description: 'Produziere Beats mit Suno/Udio und veröffentliche sie auf Spotify.',
      tools: ['Music Generator'],
      icon: '🎵',
      color: 'from-emerald-500 to-green-600',
      actionRoute: '/app/music',
      tickerSymbol: 'AIAUD'
    }
  ];

  const filteredTrends = activeTab === 'all' ? trends : trends.filter(t => t.category === activeTab);

  // Simulated live data for the ticker
  const [tickerItems] = useState([
    "VOLATILITY DETECTED IN AI STOCK PHOTOS (+14%)",
    "NEW ALGORITHM UPDATE FAVORS FACELESS YOUTUBE",
    "PROMPT ENGINEERING DEMAND AT ALL-TIME HIGH",
    "SUNO V3 RELEASE DRIVES AUDIO HUSTLE ROI UP",
    "AMAZON KDP SATURATION: NICHE DOWN REQUIRED",
    "GLOBAL AI MARKET CAP PROJECTED TO 1.5T"
  ]);

  return (
    <div className="animate-fade-in p-6 max-w-7xl mx-auto text-slate-200 min-h-screen font-sans">
      
      {/* Bloomberg-style Ticker Tape */}
      <div className="w-full bg-slate-950 border-y border-emerald-500/30 overflow-hidden py-2 mb-8 flex relative z-10 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
        <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {tickerItems.concat(tickerItems).map((item, i) => (
            <span key={i} className="text-emerald-400 font-mono text-xs font-bold px-8 flex items-center gap-3 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="mb-10 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 blur-3xl -z-10 rounded-full h-32"></div>
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-700/50 pb-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 drop-shadow-sm font-mono tracking-tight">
              SYS.RADAR_TERMINAL
            </h1>
            <p className="text-sm text-emerald-500/70 font-mono uppercase tracking-widest">
              Live AI Monetization Opportunities // Market Analysis Data
            </p>
          </div>
          <div className="text-right mt-4 md:mt-0 font-mono text-xs text-slate-500">
            <div>STATUS: <span className="text-emerald-400 animate-pulse">ONLINE & TRACKING</span></div>
            <div>LAST SYNC: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </div>

      {/* Categories / Terminal Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-800 pb-4">
        {['all', 'video', 'publishing', 'images', 'prompts', 'audio'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-1.5 rounded-sm text-xs font-mono font-bold transition-all uppercase ${
              activeTab === cat 
                ? 'bg-emerald-500/20 text-emerald-400 border-b-2 border-emerald-400' 
                : 'text-slate-500 hover:text-emerald-200 hover:bg-slate-800'
            }`}
          >
            [{cat}]
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrends.map(trend => (
          <div 
            key={trend.id}
            className="group relative bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-lg overflow-hidden hover:border-emerald-500/50 transition-all duration-300 shadow-xl flex flex-col font-mono"
          >
            {/* Terminal Header */}
            <div className="bg-slate-950 px-4 py-2 flex justify-between items-center border-b border-slate-800">
              <span className="text-emerald-500 font-bold text-sm tracking-wider">{trend.tickerSymbol}</span>
              <span className="text-xs text-slate-500">ROI: <span className="text-emerald-400">{trend.roi}</span></span>
            </div>
            
            <div className="p-5 flex-grow flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl bg-slate-800/50 p-2 rounded border border-slate-700">{trend.icon}</div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors uppercase tracking-tight">
                  {trend.title}
                </h3>
              </div>

              <p className="text-xs text-slate-400 mb-6 flex-grow font-sans leading-relaxed">
                {trend.description}
              </p>
              
              {/* Animated Progress Bars */}
              <div className="space-y-4 mb-6 bg-slate-950/50 p-3 rounded border border-slate-800/50">
                
                <div>
                  <div className="flex justify-between text-[10px] uppercase text-slate-500 mb-1">
                    <span>Success Probability</span>
                    <span className="text-emerald-400">{trend.potential}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] transition-all duration-1000 ease-out"
                      style={{ width: `${trend.potential}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] uppercase text-slate-500 mb-1">
                    <span>Market Demand</span>
                    <span className="text-cyan-400">{trend.demand}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all duration-1000 ease-out"
                      style={{ width: `${trend.demand}%` }}
                    ></div>
                  </div>
                </div>

              </div>
              
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {trend.tools.map(tool => (
                    <span key={tool} className="text-[9px] px-2 py-1 rounded bg-slate-800 text-slate-400 uppercase border border-slate-700">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => navigate(trend.actionRoute)}
                className="w-full py-2.5 rounded bg-slate-800 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-300 border border-slate-700 hover:border-emerald-500 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[inset_0_0_0_rgba(16,185,129,0)] hover:shadow-[inset_0_0_20px_rgba(16,185,129,0.2)]"
              >
                Execute Setup &gt;
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default SideHustleRadar;