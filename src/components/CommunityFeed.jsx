import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLanguage } from '../context/LanguageContext';

export default function CommunityFeed() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('trending');

  const feedItems = [
    {
      id: 1,
      user: '@NeonRider',
      avatar: 'https://i.pravatar.cc/150?u=neon',
      image: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80&w=800',
      prompt: 'Cyberpunk street vendor selling glowing noodles, neon rain, volumetric lighting, 8k resolution, photorealistic, cinematic shot --ar 16:9',
      likes: 1240,
      type: 'Image',
      model: 'Midjourney v6'
    },
    {
      id: 2,
      user: '@FantasyForge',
      avatar: 'https://i.pravatar.cc/150?u=forge',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
      prompt: 'A majestic dragon curled around an ancient clock tower, watercolor style, studio ghibli, ethereal lighting, highly detailed',
      likes: 892,
      type: 'Image',
      model: 'Niji 6'
    },
    {
      id: 3,
      user: '@VideoSynth',
      avatar: 'https://i.pravatar.cc/150?u=synth',
      image: 'https://images.unsplash.com/photo-1535016120720-40c746a51d47?auto=format&fit=crop&q=80&w=800',
      prompt: 'FPV drone flying through a futuristic canyon city, flying cars passing by, motion blur, hyperrealistic 60fps',
      likes: 543,
      type: 'Video',
      model: 'Sora'
    },
    {
      id: 4,
      user: '@BeatMaster',
      avatar: 'https://i.pravatar.cc/150?u=beat',
      image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800',
      prompt: '[Intro] Heavy synth bass [Verse 1] Cybernetic whispers [Chorus] Explosive dubstep drop with female vocal chops',
      likes: 2100,
      type: 'Music',
      model: 'Suno v3'
    },
    {
      id: 5,
      user: '@PixelArtPro',
      avatar: 'https://i.pravatar.cc/150?u=pixel',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
      prompt: '16-bit pixel art of a cozy coffee shop in space, stars out the window, lofi aesthetic',
      likes: 156,
      type: 'Image',
      model: 'DALL-E 3'
    },
    {
      id: 6,
      user: '@ArchitectAI',
      avatar: 'https://i.pravatar.cc/150?u=arch',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
      prompt: 'Modern brutalist concrete mansion hanging off a cliff over a stormy ocean, architectural photography, architectural digest',
      likes: 775,
      type: 'Image',
      model: 'Midjourney v6'
    }
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Prompt kopiert! 📋', {
      style: { background: '#1e293b', color: '#fff', border: '1px solid #3b82f6' }
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-20">
      
      {/* Header */}
      <div className="glass-panel p-8 rounded-3xl relative overflow-hidden border border-slate-700/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
              {t?.communityFeed?.title || 'Community Feed'}
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">{t?.communityFeed?.subtitle || 'Die globale Galerie. Entdecke die besten Prompts der Community, sammle Inspirationen und verdiene Sparks für deine eigenen Meisterwerke.'}</p>
          </div>
          
          <div className="flex bg-slate-900/50 p-1.5 rounded-xl border border-slate-700/50">
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'trending' ? 'bg-fuchsia-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              🔥 Trending
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'new' ? 'bg-fuchsia-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              ✨ Neu
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'following' ? 'bg-fuchsia-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              👥 Folge ich
            </button>
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {feedItems.map((item) => (
          <div key={item.id} className="break-inside-avoid glass-panel rounded-2xl overflow-hidden border border-slate-700/50 group hover:border-fuchsia-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,70,239,0.15)] bg-slate-800/40">
            
            {/* Image / Media Container */}
            <div className="relative aspect-auto">
              <img src={item.image} alt="Generierung" className="w-full h-auto object-cover" loading="lazy" />
              
              {/* Overlay Tags */}
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded border border-white/10">
                  {item.type === 'Video' ? '🎥 Video' : item.type === 'Music' ? '🎵 Musik' : '🖼️ Bild'}
                </span>
                <span className="bg-fuchsia-600/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded border border-fuchsia-400/30">
                  {item.model}
                </span>
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <button 
                  onClick={() => handleCopy(item.prompt)}
                  className="w-full bg-white/10 hover:bg-fuchsia-600 text-white font-bold py-2.5 rounded-xl backdrop-blur-sm border border-white/20 hover:border-fuchsia-500 transition-all flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  Prompt kopieren
                </button>
              </div>
            </div>

            {/* Content & Metadata */}
            <div className="p-5">
              <p className="text-slate-300 text-sm font-mono mb-4 line-clamp-3 leading-relaxed">
                {item.prompt}
              </p>
              
              <div className="flex items-center justify-between border-t border-slate-700/50 pt-4 mt-4">
                <div className="flex items-center gap-2 cursor-pointer group/user">
                  <img src={item.avatar} alt={item.user} className="w-8 h-8 rounded-full border border-slate-600 group-hover/user:border-fuchsia-400 transition-colors" />
                  <span className="text-sm font-bold text-slate-400 group-hover/user:text-white transition-colors">{item.user}</span>
                </div>
                
                <button className="flex items-center gap-1.5 text-slate-500 hover:text-fuchsia-400 transition-colors group/like">
                  <svg className="w-5 h-5 group-hover/like:fill-fuchsia-400 group-active/like:scale-125 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  <span className="text-xs font-bold">{item.likes}</span>
                </button>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
