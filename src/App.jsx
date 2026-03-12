import { useState } from 'react'
import './App.css'
import {
  tabs,
  imagePeopleTemplates,
  imageCoupleTemplates,
  videoMiscTemplates,
  videoPeopleTemplates,
  videoCoupleTemplates,
  musicTemplates
} from './data.js'

function App() {
  const [activeTab, setActiveTab] = useState('videos')
  
  // State für den Live Generator
  const [genPrompt, setGenPrompt] = useState('')
  const [genType, setGenType] = useState('image')
  const [isGenerating, setIsGenerating] = useState(false)
  const [genResult, setGenResult] = useState(null)

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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
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

      {/* Main Content Area */}
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
                  <textarea 
                    value={genPrompt}
                    onChange={(e) => setGenPrompt(e.target.value)}
                    placeholder="Beschreibe deine Idee im Detail..."
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-4 text-slate-200 h-40 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-4"
                  />
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
              <h3 className="text-2xl font-bold mb-6">👤 Menschen & Porträts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {imagePeopleTemplates.map((template) => (
                  <div key={template.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col group hover:border-blue-500/50 transition-colors">
                    <div className={`h-32 w-full bg-gradient-to-br ${template.color} flex items-center justify-center`}><span className="text-white/80 font-bold text-lg drop-shadow-md text-center px-2">{template.title}</span></div>
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="bg-slate-900 p-3 rounded text-xs font-mono text-slate-400 mb-4 flex-grow line-clamp-3 border border-slate-700">{template.prompt}</div>
                      <button onClick={() => copyToClipboard(template.prompt)} className="bg-slate-700 hover:bg-blue-600 text-slate-200 py-2 rounded-lg text-sm w-full mt-auto">Kopieren</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">❤️ Paare & Romantik</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {imageCoupleTemplates.map((template) => (
                  <div key={template.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col group hover:border-red-500/50 transition-colors">
                    <div className={`h-32 w-full bg-gradient-to-br ${template.color} flex items-center justify-center`}><span className="text-white/80 font-bold text-lg drop-shadow-md text-center px-2">{template.title}</span></div>
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="bg-slate-900 p-3 rounded text-xs font-mono text-slate-400 mb-4 flex-grow line-clamp-3 border border-slate-700">{template.prompt}</div>
                      <button onClick={() => copyToClipboard(template.prompt)} className="bg-slate-700 hover:bg-red-600 text-slate-200 py-2 rounded-lg text-sm w-full mt-auto">Kopieren</button>
                    </div>
                  </div>
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
              <h3 className="text-2xl font-bold mb-6">🌍 Landschaften, Action & Makro</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videoMiscTemplates.map((template) => (
                  <div key={template.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col group hover:border-orange-500/50 transition-colors">
                    <div className={`h-32 w-full bg-gradient-to-br ${template.color} flex items-center justify-center`}><span className="text-white/80 font-bold text-lg drop-shadow-md text-center px-2">{template.title}</span></div>
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="bg-slate-900 p-3 rounded text-xs font-mono text-slate-400 mb-4 flex-grow line-clamp-3 border border-slate-700">{template.prompt}</div>
                      <button onClick={() => copyToClipboard(template.prompt)} className="bg-slate-700 hover:bg-orange-600 text-slate-200 py-2 rounded-lg text-sm w-full mt-auto">Kopieren</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6">👤 Menschen in Bewegung</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videoPeopleTemplates.map((template) => (
                  <div key={template.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col group hover:border-blue-500/50 transition-colors">
                    <div className={`h-32 w-full bg-gradient-to-br ${template.color} flex items-center justify-center`}><span className="text-white/80 font-bold text-lg drop-shadow-md text-center px-2">{template.title}</span></div>
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="bg-slate-900 p-3 rounded text-xs font-mono text-slate-400 mb-4 flex-grow line-clamp-3 border border-slate-700">{template.prompt}</div>
                      <button onClick={() => copyToClipboard(template.prompt)} className="bg-slate-700 hover:bg-blue-600 text-slate-200 py-2 rounded-lg text-sm w-full mt-auto">Kopieren</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">❤️ Paare & Romantik</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videoCoupleTemplates.map((template) => (
                  <div key={template.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col group hover:border-red-500/50 transition-colors">
                    <div className={`h-32 w-full bg-gradient-to-br ${template.color} flex items-center justify-center`}><span className="text-white/80 font-bold text-lg drop-shadow-md text-center px-2">{template.title}</span></div>
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="bg-slate-900 p-3 rounded text-xs font-mono text-slate-400 mb-4 flex-grow line-clamp-3 border border-slate-700">{template.prompt}</div>
                      <button onClick={() => copyToClipboard(template.prompt)} className="bg-slate-700 hover:bg-red-600 text-slate-200 py-2 rounded-lg text-sm w-full mt-auto">Kopieren</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: KI MUSIK --- */}
        {activeTab === 'music' && (
          <div className="max-w-6xl animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">🎵 KI Musik-Prompts</h2>
            <p className="text-slate-400 mb-8">Erstelle perfekte Text-Prompts für Musikgeneratoren wie Suno AI oder Udio.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {musicTemplates.map((template) => (
                <div key={template.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col">
                  <div className={`h-32 w-full bg-gradient-to-r ${template.color} flex items-center justify-center`}><span className="text-white font-bold text-xl drop-shadow-md">{template.title}</span></div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="bg-slate-900 p-3 rounded text-sm font-mono text-purple-300 mb-4 flex-grow border border-slate-700">{template.prompt}</div>
                    <button onClick={() => copyToClipboard(template.prompt)} className="bg-slate-700 hover:bg-purple-600 text-slate-200 py-2 rounded-lg text-sm w-full mt-auto">Kopieren</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB: PLATZHALTER FÜR DEN REST --- */}
        {['learning', 'repair', 'feedback', 'auth'].includes(activeTab) && (
          <div className="max-w-4xl animate-fade-in flex flex-col items-center justify-center h-96 bg-slate-800 rounded-xl border border-slate-700 border-dashed">
            <h2 className="text-2xl font-bold mb-2 text-slate-300">🚧 Work in Progress</h2>
            <p className="text-slate-500">Diese Kategorie bauen wir als nächstes auf!</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default App