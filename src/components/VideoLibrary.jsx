import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLanguage } from '../context/LanguageContext';
import { videoPromptsData } from '../data_video_prompts';


export default function VideoLibrary() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  // Favorites State
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  
  const categories = ['Alle', 'Cinematic', 'Drone', 'Animation', 'Nature', 'Sci-Fi', 'Product', 'Vintage', 'Hyperlapse', 'Abstract', 'Horror'];
  
  // State for new prompt form
  const [newPrompt, setNewPrompt] = useState({ title: '', prompt: '', image: '', tags: '' });
  
  const defaultPrompts = [
    {
      id: 1,
      title: 'Cinematic Rainy Cyberpunk City',
      prompt: '[VIDEO PROMPT] A slow tracking shot of a neon-lit cyberpunk city street in the rain. People walking with glowing umbrellas. Puddles reflecting the neon signs. Cinematic color grading, 4k, 60fps, photorealistic.',
      image: 'https://picsum.photos/seed/vid_cyberpunk/600/400',
      tags: ['Cinematic', 'Sci-Fi']
    },
    {
      id: 2,
      title: 'Drone FPV Mountain Dive',
      prompt: '[VIDEO PROMPT] A fast FPV drone diving down the side of a massive snow-capped mountain, weaving between pine trees, dynamic camera movement, wide angle lens, 4k, action shot.',
      image: 'https://picsum.photos/seed/vid_mountain/600/400',
      tags: ['Drone', 'Nature']
    },
    {
      id: 3,
      title: 'Pixar-Style Coffee Shop',
      prompt: '[VIDEO PROMPT] A cute 3D animation of a barista robot serving coffee in a cozy cafe. Sunlight streaming through the window. Fluid animation, octane render, vibrant colors, Pixar style.',
      image: 'https://picsum.photos/seed/vid_pixar/600/400',
      tags: ['Animation', '3D']
    }
  ];

  const [userPrompts, setUserPrompts] = useState([]);
  
  // Combine all prompts dynamically so hot-reloading data files works instantly
  const prompts = [...userPrompts, ...videoPromptsData, ...defaultPrompts];


  const toggleFavorite = (id) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(f => f !== id);
      } else {
        toast.success('Zu Favoriten hinzugefügt!', { icon: '❤️' });
        return [...prev, id];
      }
    });
  };

  const filteredPrompts = prompts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFavorites = showFavoritesOnly ? favorites.includes(p.id) : true;
    const matchesCategory = (selectedCategory === 'Alle' || selectedCategory === 'All' || selectedCategory === 'الكل') ? true : p.tags.some(tag => tag.includes(selectedCategory));
    return matchesSearch && matchesFavorites && matchesCategory;
  });

  const handleCopy = (promptText) => {
    navigator.clipboard.writeText(promptText);
    toast.success('Prompt kopiert!');
  };

  const handleAddPrompt = (e) => {
    e.preventDefault();
    if (!newPrompt.title || !newPrompt.prompt) {
      toast.error('Bitte Titel und Prompt ausfüllen!');
      return;
    }

    const newEntry = {
      id: Date.now(),
      title: newPrompt.title,
      prompt: newPrompt.prompt,
      image: newPrompt.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
      tags: newPrompt.tags.split(',').map(t => t.trim()).filter(t => t)
    };

    setUserPrompts([newEntry, ...userPrompts]);
    setShowModal(false);
    setNewPrompt({ title: '', prompt: '', image: '', tags: '' });
    toast.success('Neuer Prompt erfolgreich hinzugefügt!');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 flex items-center gap-3">
            🎥 Video-Prompts Bibliothek
          </h1>
          <p className="text-gray-400 mt-2">
            Entdecke die besten Kamerafahrten, Animationen und Prompts für Sora, Runway Gen-3, Kling und Luma.
          </p>
        </div>
        
        <div className="flex flex-wrap w-full md:w-auto gap-3">
          <input
            type="text"
            placeholder="Suchen (z.B. Anime, Portrait...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 min-w-[200px]"
          />
          
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors border flex items-center gap-2 ${
              showFavoritesOnly 
                ? 'bg-pink-500/20 border-pink-500 text-pink-500' 
                : 'bg-slate-800 border-slate-700 text-gray-400 hover:text-white hover:border-slate-500'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">{t?.vidLib?.favoritesBtn || 'Favoriten'}</span>
          </button>

          <button 
            onClick={() => setShowModal(true)}
            className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap flex items-center gap-2 shadow-lg shadow-purple-900/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">Neuer Prompt</span>
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 pt-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
              selectedCategory === cat 
                ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-900/20' 
                : 'bg-slate-800 border-slate-700 text-gray-400 hover:text-white hover:border-slate-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((item) => (
          <div key={item.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-purple-500 transition-all group flex flex-col relative">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Favorite Button Overlay */}
              <div className="absolute top-2 left-2 z-10">
                <button 
                  onClick={() => toggleFavorite(item.id)}
                  className="p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all focus:outline-none border border-white/10"
                  title="Zu Favoriten hinzufügen"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-colors ${favorites.includes(item.id) ? 'text-pink-500' : 'text-gray-300 hover:text-pink-400'}`} 
                    fill={favorites.includes(item.id) ? "currentColor" : "none"} 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              <div className="absolute top-2 right-2 flex gap-1 flex-wrap justify-end">
                {item.tags.map(tag => (
                  <span key={tag} className="text-xs bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-md mb-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-white mb-2 pr-8">{item.title}</h3>
              <div className="bg-slate-900 rounded-lg p-3 mb-4 flex-grow relative group/code">
                <p className="text-sm text-gray-300 font-mono line-clamp-3 group-hover/code:line-clamp-none transition-all">
                  {item.prompt}
                </p>
              </div>
              
              <button 
                onClick={() => handleCopy(item.prompt)}
                className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Prompt Kopieren
              </button>
            </div>
          </div>
        ))}
        {filteredPrompts.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            {showFavoritesOnly ? "Du hast noch keine Favoriten gespeichert. ❤️" : `Keine Prompts für "${searchTerm}" gefunden.`}
          </div>
        )}
      </div>

      {/* Modal for adding new prompt */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-5 border-b border-slate-700">
              <h2 className="text-xl font-bold text-white">Neuen Prompt beisteuern</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddPrompt} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Titel</label>
                <input 
                  type="text" 
                  value={newPrompt.title}
                  onChange={e => setNewPrompt({...newPrompt, title: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                  placeholder="z.B. Cyberpunk Katze"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Der Prompt</label>
                <textarea 
                  value={newPrompt.prompt}
                  onChange={e => setNewPrompt({...newPrompt, prompt: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none h-24 resize-none"
                  placeholder="/imagine prompt: A cute cyberpunk cat..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Bild-URL (Optional)</label>
                <input 
                  type="url" 
                  value={newPrompt.image}
                  onChange={e => setNewPrompt({...newPrompt, image: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tags (Komma-getrennt)</label>
                <input 
                  type="text" 
                  value={newPrompt.tags}
                  onChange={e => setNewPrompt({...newPrompt, tags: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                  placeholder="Cyberpunk, Tier, 3D"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  Abbrechen
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  Hinzufügen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
