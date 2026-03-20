import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useCredits } from '../context/CreditsContext';
import { marketplacePrompts as initialPrompts } from '../data.js';
import { useLanguage } from '../context/LanguageContext';

export default function Marketplace() {
  const { credits, spendCredits } = useCredits();
  const [searchQuery, setSearchQuery] = useState('');
  const [prompts, setPrompts] = useState(initialPrompts);
  const [activeCategory, setActiveCategory] = useState('Alle');
  const { t } = useLanguage();

  const categories = [t.Marketplace.all, t.Marketplace.categoryMidjourney, t.Marketplace.categoryStableDiffusion, t.Marketplace.categoryGPT4, t.Marketplace.categoryVideo, t.Marketplace.categoryWebDev];

  const handleBuyPrompt = (item) => {
    // Determine cost (dummy logic: strip non-digits, fallback to 50)
    const cost = parseInt(item.price.replace(/\D/g, '')) || 50;
    
    if (spendCredits(cost, `${t.Marketplace.costPrefix} ${item.title}`)) {
      toast.success(t.Marketplace.successMessage.replace('{title}', item.title), {
        icon: '🛍️',
        style: { background: '#10b981', color: '#fff' }
      });
    }
  };

  const filteredPrompts = prompts.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === t.Marketplace.all || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl animate-fade-in mx-auto mt-4 px-4 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600 tracking-tight">{t.Marketplace.promptMarketplaceTitle}</h2>
          <p className="text-slate-400 text-lg">{t.Marketplace.promptMarketplaceDescription}</p>
        </div>
        
        <div className="flex items-center gap-3 bg-slate-800 p-2 rounded-2xl border border-slate-700 w-full md:w-auto">
          <span className="pl-3 text-slate-400">🔍</span>
          <input 
            type="text" 
            placeholder={t.Marketplace.searchPromptsPlaceholder} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none text-white focus:outline-none w-full md:w-64"
          />
        </div>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto custom-scrollbar pb-2">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
              activeCategory === cat 
              ? 'bg-amber-500 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.4)]' 
              : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPrompts.map(item => (
          <div key={item.id} className="glass-card rounded-3xl overflow-hidden flex flex-col group hover:border-amber-500/50 hover:shadow-[0_0_30px_-10px_rgba(245,158,11,0.3)] hover:-translate-y-1 transition-all relative">
            
            <div className="p-6 flex flex-col flex-grow relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-start mb-4 mt-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-slate-800 text-amber-400 px-2 py-1 rounded-md border border-amber-500/30">
                  {item.category}
                </span>
                <span className="text-xl font-black text-amber-400 flex items-center gap-1">
                  ⚡ {parseInt(item.price.replace(/\D/g, '')) || 50}
                </span>
              </div>
              
              <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400 mb-6 flex-grow font-mono bg-slate-900/50 p-3 rounded-xl border border-slate-800/50 line-clamp-4">
                {item.preview || t.Marketplace.promptPreviewFallback}
              </p>
              
              <div className="flex items-center gap-2 mb-4 text-xs text-slate-500 font-bold">
                <span>{t.Marketplace.creatorPrefix}</span>
                <span>•</span>
                <span>⭐ 4.9 (128)</span>
              </div>
              
              <button 
                onClick={() => handleBuyPrompt(item)}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-black py-3 px-4 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex justify-center items-center gap-2 group-hover:scale-[1.02]"
              >
                <span>{t.Marketplace.buyButton}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredPrompts.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <span className="text-4xl block mb-4">🕵️‍♂️</span>
          {t.Marketplace.noPromptsFound}
        </div>
      )}
    </div>
  );
}