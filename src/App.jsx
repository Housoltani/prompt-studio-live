import { useState } from 'react'
import './App.css'
import {
  tabs,
  imagePeopleTemplates,
  imageCoupleTemplates,
  videoMiscTemplates,
  videoPeopleTemplates,
  videoCoupleTemplates,
  extendedMusicTemplates,
  repairTutorials
} from './data.js'

function App() {
  const [activeTab, setActiveTab] = useState('images')
  
  const [musicSearch, setMusicSearch] = useState('')
  const [repairSearch, setRepairSearch] = useState('')
  const [genPrompt, setGenPrompt] = useState('')
  const [genType, setGenType] = useState('image')
  const [isGenerating, setIsGenerating] = useState(false)
  const [genResult, setGenResult] = useState(null)

  // State für "Geliked" Buttons über alle Kategorien hinweg
  const [likedItems, setLikedItems] = useState({})

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const toggleLike = (type, id) => {
    const key = `${type}-${id}`;
    setLikedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = () => {
    if (!genPrompt.trim()) return;
    setIsGenerating(true);
    setGenResult(null);
    setTimeout(() => {
      setIsGenerating(false);
      setGenResult({
        type: genType,
        url: genType === 'image' 
          ? 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop' 
          : genType === 'video' ? 'video' : 'music'
      });
    }, 3000);
  };

  // --- REUSABLE COMPONENT FÜR BILDER & VIDEOS ---
  // Da Bilder und Videos das gleiche Layout haben, bauen wir einen "PromptCard" Helfer,
  // um den Code übersichtlich und klein zu halten.
  const PromptCard = ({ item, type, hoverColorClass }) => {
    const isLiked = likedItems[`${type}-${item.id}`];
    return (
      <div className={`bg-slate-800 rounded-xl border border-slate-700 overflow-hidden group hover:border-${hoverColorClass}-500/50 transition-colors flex flex-col`}>
        <div className={`h-32 w-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
          <span className="text-white/80 font-bold text-lg drop-shadow-md text-center px-2">{item.title}</span>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="bg-slate-900 p-3 rounded text-xs font-mono text-slate-400 mb-4 flex-grow line-clamp-3 group-hover:line-clamp-none transition-all border border-slate-700">
            {item.prompt}
          </div>
          
          {/* Interaktions-Leiste: Like, View & Copy */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50">
            <div className="flex items-center gap-4 text-slate-400">
              <button 
                onClick={() => toggleLike(type, item.id)}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isLiked ? 'text-red-500' : 'hover:text-red-400'}`}
              >
                <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                <span>{isLiked ? (item.likes + 1).toLocaleString() : item.likes.toLocaleString()}</span>
              </button>
              
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                <span>{item.views}</span>
              </div>
            </div>
            <button onClick={() => copyToClipboard(item.prompt)} className="bg-slate-700 hover:bg-blue-600 text-slate-200 py-2 px-3 rounded-lg text-sm font-medium transition-colors">
              Kopieren
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">
      
      {/* Sidebar Navigation */}
      <div className="w-72 bg-slate-950 border-r border-slate-800 p-6 flex flex-col fixed h-full overflow-y-auto z-10">
        <h1 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Prompt Studio
        </h1>
        <nav className="flex-1 space-y-2">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full text-left p-3 rounded-lg transition-colors flex flex-col ${activeTab === tab.id ? 'bg-blue-600/20 border border-blue-500/50 text-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <span className="font-semibold text-sm">{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 p-8 ml-72">

        {/* --- TAB: LIVE GENERATOR --- */}
        {activeTab === 'generator' && (
          <div className="max-w-5xl animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">✨ Live Generator</h2>
            <p className="text-slate-400 mb-8">Tippe einen Prompt ein und generiere Bild, Video oder Musik direkt im Browser.</p>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                  <label className="block text-sm font-bold text-slate-300 mb-3">Was möchtest du erschaffen?</label>
                  <textarea value={genPrompt} onChange={(e) => setGenPrompt(e.target.value)} placeholder="Beschreibe deine Idee im Detail..." className="w-full bg-slate-900 border border-slate-600 rounded-lg p-4 text-slate-200 h-40 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-4" />
                  <div className="flex gap-2 mb-6">
                    <button onClick={() => setGenType('image')} className={`flex-1 py-2 rounded-lg text-sm font-medium border ${genType === 'image' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-600 text-slate-400 hover:text-slate-200'}`}>🖼️ Bild</button>
                    <button onClick={() => setGenType('video')} className={`flex-1 py-2 rounded-lg text-sm font-medium border ${genType === 'video' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-600 text-slate-400 hover:text-slate-200'}`}>🎥 Video</button>
                    <button onClick={() => setGenType('music')} className={`flex-1 py-2 rounded-lg text-sm font-medium border ${genType === 'music' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-900 border-slate-600 text-slate-400 hover:text-slate-200'}`}>🎵 Musik</button>
                  </div>
                  <button onClick={handleGenerate} disabled={isGenerating || !genPrompt.trim()} className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-bold py-4 rounded-lg flex justify-center items-center gap-2 text-lg">
                    {isGenerating ? 'Generiert...' : '🚀 Jetzt Generieren'}
                  </button>
                </div>
              </div>
              <div className="lg:col-span-3">
                <div className="bg-slate-800 p-2 rounded-xl border border-slate-700 h-full min-h-[400px] flex items-center justify-center relative overflow-hidden">
                  {!isGenerating && !genResult && <p className="text-slate-500">Das Ergebnis erscheint hier.</p>}
                  {isGenerating && <p className="text-blue-400 animate-pulse">KI berechnet das Ergebnis...</p>}
                  {genResult && !isGenerating && (
                    <div className="w-full h-full animate-fade-in relative group flex items-center justify-center">
                      {genResult.type === 'image' && <img src={genResult.url} className="w-full h-full object-cover rounded-lg" />}
                      {genResult.type === 'video' && <div className="text-blue-400 font-bold text-lg">🎥 Dein KI Video (Platzhalter)</div>}
                      {genResult.type === 'music' && <div className="text-purple-400 font-bold text-lg">🎵 KI Hit-Single (Platzhalter)</div>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: KI BILDER --- */}
        {activeTab === 'images' && (
          <div className="max-w-7xl animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">🖼️ KI Bild-Prompts</h2>
            <p className="text-slate-400 mb-12">Die besten Vorlagen für Porträts, Charakter-Design und romantische Szenen.</p>
            
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><span>👤</span> Menschen & Porträts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {imagePeopleTemplates.map(template => (
                  <PromptCard key={template.id} item={template} type="imgPeople" hoverColorClass="blue" />
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><span>❤️</span> Paare & Romantik</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {imageCoupleTemplates.map(template => (
                  <PromptCard key={template.id} item={template} type="imgCouple" hoverColorClass="red" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: KI VIDEOS --- */}
        {activeTab === 'videos' && (
          <div className="max-w-7xl animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">🎥 KI Video-Prompts</h2>
            <p className="text-slate-400 mb-12">Meistere die Bewegung für Sora, Runway Gen-3 oder Pika.</p>
            
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><span>🌍</span> Landschaften, Action & Makro</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videoMiscTemplates.map(template => (
                  <PromptCard key={template.id} item={template} type="vidMisc" hoverColorClass="orange" />
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><span>👤</span> Menschen in Bewegung</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videoPeopleTemplates.map(template => (
                  <PromptCard key={template.id} item={template} type="vidPeople" hoverColorClass="blue" />
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><span>❤️</span> Paare & Romantik</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videoCoupleTemplates.map(template => (
                  <PromptCard key={template.id} item={template} type="vidCouple" hoverColorClass="red" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: KI MUSIK --- */}
        {activeTab === 'music' && (
          <div className="max-w-6xl animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">🎵 KI Musik & Audio</h2>
            <p className="text-slate-400 mb-8">Hit-Garantie: Die perfekten Prompts für Suno AI und Udio.</p>
            
            <div className="mb-10">
              <div className="relative max-w-2xl">
                <input 
                  type="text" 
                  value={musicSearch}
                  onChange={(e) => setMusicSearch(e.target.value)}
                  placeholder="Suche nach Genre oder Stimmung..." 
                  className="w-full bg-slate-800 border border-slate-600 text-slate-100 text-lg rounded-xl focus:ring-purple-500 block pl-4 p-4 shadow-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {extendedMusicTemplates.filter(t => t.title.toLowerCase().includes(musicSearch.toLowerCase()) || t.genre.toLowerCase().includes(musicSearch.toLowerCase())).map((track) => {
                const isLiked = likedItems[`music-${track.id}`];
                return (
                <div key={track.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden group hover:border-purple-500 transition-colors flex flex-col">
                  <div className={`h-36 w-full bg-gradient-to-br ${track.color} relative flex items-center justify-center`}>
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded font-mono">{track.time}</div>
                    <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full border border-white/30">{track.platform}</div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl text-slate-100 mb-2 leading-tight">{track.title}</h3>
                    <div className="bg-slate-900 p-3 rounded text-xs font-mono text-purple-300 mb-4 flex-grow line-clamp-3">{track.prompt}</div>
                    
                    {/* Interaktions-Leiste */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50 text-slate-400">
                      <div className="flex items-center gap-4">
                        <button onClick={() => toggleLike('music', track.id)} className={`flex items-center gap-1.5 text-sm font-medium ${isLiked ? 'text-red-500' : 'hover:text-red-400'}`}>
                          <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                          <span>{isLiked ? (track.likes + 1).toLocaleString() : track.likes.toLocaleString()}</span>
                        </button>
                        <div className="flex items-center gap-1.5 text-sm font-medium">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                          <span>{track.views}</span>
                        </div>
                      </div>
                      <button onClick={() => copyToClipboard(track.prompt)} className="bg-slate-700 hover:bg-purple-600 text-slate-200 py-2 px-3 rounded-lg text-sm">Kopieren</button>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>
        )}

        {/* --- TAB: TECH REPAIR --- */}
        {activeTab === 'repair' && (
          <div className="max-w-6xl animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">🛠️ Tech Repair</h2>
            <p className="text-slate-400 mb-8">Video-Tutorials & Anleitungen.</p>
            
            <div className="mb-10">
              <input 
                type="text" 
                value={repairSearch}
                onChange={(e) => setRepairSearch(e.target.value)}
                placeholder="Welches Gerät möchtest du reparieren?" 
                className="w-full bg-slate-800 border border-slate-600 text-slate-100 text-lg rounded-xl focus:ring-blue-500 block p-4 shadow-lg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {repairTutorials.filter(t => t.title.toLowerCase().includes(repairSearch.toLowerCase()) || t.device.toLowerCase().includes(repairSearch.toLowerCase())).map((tutorial) => {
                const isLiked = likedItems[`repair-${tutorial.id}`];
                return (
                <div key={tutorial.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden group hover:border-blue-500 transition-colors flex flex-col">
                  <div className={`h-48 w-full bg-gradient-to-br ${tutorial.color} relative flex items-center justify-center`}>
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">{tutorial.time}</div>
                    <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full">{tutorial.category}</div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl text-slate-100 mb-2">{tutorial.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">Gerät: <span className="font-medium text-slate-300">{tutorial.device}</span></p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50 text-slate-400">
                      <div className="flex items-center gap-4">
                        <button onClick={() => toggleLike('repair', tutorial.id)} className={`flex items-center gap-1.5 text-sm font-medium ${isLiked ? 'text-red-500' : 'hover:text-red-400'}`}>
                          <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                          <span>{isLiked ? (tutorial.likes + 1).toLocaleString() : tutorial.likes.toLocaleString()}</span>
                        </button>
                        <div className="flex items-center gap-1.5 text-sm font-medium">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                          <span>{tutorial.views}</span>
                        </div>
                      </div>
                      <button className="text-blue-500">Play</button>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>
        )}

        {['learning', 'feedback', 'auth'].includes(activeTab) && (
          <div className="max-w-4xl animate-fade-in flex flex-col items-center justify-center h-96 bg-slate-800 rounded-xl border border-slate-700 border-dashed">
            <h2 className="text-2xl font-bold mb-2 text-slate-300">🚧 Work in Progress</h2>
          </div>
        )}

      </div>
    </div>
  )
}

export default App