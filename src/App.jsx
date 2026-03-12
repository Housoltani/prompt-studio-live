import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './supabaseClient'
import OpenAI from 'openai'
import {
  tabs as dataTabs,
  imagePeopleTemplates,
  imageCoupleTemplates,
  videoMiscTemplates,
  videoPeopleTemplates,
  videoCoupleTemplates,
  extendedMusicTemplates,
  repairTutorials,
  learningTutorials,
  communityPrompts,
  marketplacePrompts // <-- NEU IMPORTIERT
} from './data.js'
import { translations } from './i18n.js'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true 
});

function App() {
  const [lang, setLang] = useState('de')
  const t = translations[lang]

  const [activeTab, setActiveTab] = useState('studio') // Starten wir bei den neuen Tabs
  
  const [musicSearch, setMusicSearch] = useState('')
  const [repairSearch, setRepairSearch] = useState('')
  const [learningSearch, setLearningSearch] = useState('')
  
  const [genPrompt, setGenPrompt] = useState('')
  const [genType, setGenType] = useState('image')
  const [isGenerating, setIsGenerating] = useState(false)
  const [genResult, setGenResult] = useState(null)
  const [genError, setGenError] = useState(null)
  
  const [extractorStatus, setExtractorStatus] = useState('idle')
  const [extractedText, setExtractedText] = useState('')
  
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [user, setUser] = useState(null)
  const [likedItems, setLikedItems] = useState({})
  const [copiedItems, setCopiedItems] = useState({})

  // Studio State
  const [studioFolders] = useState(['Website Grafiken', 'Social Media Posts', 'Youtube Thumbnails', 'Meine Favoriten'])
  const [activeFolder, setActiveFolder] = useState('Meine Favoriten')

  // Flow State
  const [flowStep, setFlowStep] = useState(1)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleGenerate = () => {
    if (!genPrompt.trim()) return;
    setIsGenerating(true);
    setGenResult(null);
    setGenError(null);
    
    // DEMO Fallback
    setTimeout(() => {
      setIsGenerating(false);
      if (genType === 'image') {
        setGenResult({ type: 'image', url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop' });
      } else {
        setGenResult({ type: 'text', url: null, text: `/imagine prompt: ${genPrompt}, cinematic lighting, highly detailed, 8k resolution --ar 16:9`, originalType: genType });
      }
    }, 2500); 
  };

  const copyToClipboard = (text, idStr) => {
    navigator.clipboard.writeText(text);
    setCopiedItems(prev => ({ ...prev, [idStr]: true }));
    setTimeout(() => setCopiedItems(prev => ({ ...prev, [idStr]: false })), 2000);
  };

  const toggleLike = (type, id) => {
    const key = `${type}-${id}`;
    setLikedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`min-h-screen bg-slate-900 text-slate-100 flex ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      
      <div className={`w-72 bg-slate-950 border-slate-800 p-6 flex flex-col fixed h-full overflow-y-auto z-20 ${lang === 'ar' ? 'border-l right-0' : 'border-r left-0'}`}>
        <h1 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          {t.appTitle}
        </h1>
        
        {user && (
          <div className="mb-6 p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-emerald-400 rounded-full flex items-center justify-center font-bold text-white">
                {user.user_metadata?.full_name ? user.user_metadata.full_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
             </div>
             <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{user.user_metadata?.full_name || 'User'}</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
             </div>
          </div>
        )}

        <nav className="flex-1 space-y-1.5">
          {dataTabs.map(tab => {
            const isProFeature = ['studio', 'flows', 'marketplace'].includes(tab.id);
            return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'} p-2.5 rounded-lg transition-colors flex flex-col ${activeTab === tab.id ? 'bg-blue-600/20 border border-blue-500/50 text-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <span className="font-semibold text-sm flex items-center justify-between w-full">
                {t.tabs[tab.id] || tab.name}
                {isProFeature && <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded ml-2 uppercase font-bold">Pro</span>}
              </span>
            </button>
          )})}
        </nav>
      </div>

      <div className={`flex-1 p-8 ${lang === 'ar' ? 'mr-72' : 'ml-72'}`}>

        {/* --- 1. MEIN STUDIO (WORKSPACE) --- */}
        {activeTab === 'studio' && (
          <div className="max-w-7xl animate-fade-in mx-auto mt-4">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">📂 Mein Studio</h2>
                <p className="text-slate-400">Dein privater Workspace zum Organisieren von Prompts.</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                Neuer Ordner
              </button>
            </div>
            
            <div className="flex gap-8">
              {/* Sidebar Ordner */}
              <div className="w-64 space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">Deine Ordner</div>
                {studioFolders.map(folder => (
                  <button key={folder} onClick={() => setActiveFolder(folder)} className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 ${activeFolder === folder ? 'bg-slate-800 text-blue-400 font-bold border border-slate-700' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path></svg>
                    {folder}
                  </button>
                ))}
              </div>
              
              {/* Inhalt des Ordners */}
              <div className="flex-1 bg-slate-800/30 border border-slate-700 rounded-3xl p-8 min-h-[500px]">
                <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path></svg>
                    {activeFolder}
                  </h3>
                  <span className="text-sm text-slate-500">2 Elemente gespeichert</span>
                </div>
                
                {/* Fake gespeicherte Prompts im Ordner */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {communityPrompts.slice(0,2).map(item => (
                    <div key={item.id} className="bg-slate-800 rounded-xl border border-slate-700 p-4 relative group">
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <button className="p-1.5 bg-slate-700 rounded text-slate-300 hover:text-white"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>
                        <button className="p-1.5 bg-slate-700 rounded text-red-400 hover:bg-red-500/20"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                      </div>
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1 block">Bild Prompt</span>
                      <h4 className="font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-xs font-mono text-slate-400 line-clamp-3 mb-4">{item.prompt}</p>
                      <button onClick={() => copyToClipboard(item.prompt, `studio-${item.id}`)} className="text-sm font-bold text-slate-300 hover:text-white bg-slate-900 py-2 px-4 rounded-lg w-full transition-colors">
                        {copiedItems[`studio-${item.id}`] ? 'Kopiert!' : 'Kopieren'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- 2. AUTOMATISIERUNG / FLOWS --- */}
        {activeTab === 'flows' && (
          <div className="max-w-6xl animate-fade-in mx-auto mt-4">
            <h2 className="text-3xl font-bold mb-2">⚡ Prompt Chains (Automatisierung)</h2>
            <p className="text-slate-400 mb-8">Verbinde KIs miteinander. Das Output-Bild der einen KI wird zum Input der nächsten.</p>
            
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Step 1 */}
                <div className={`flex-1 bg-slate-800 border-2 ${flowStep >= 1 ? 'border-blue-500' : 'border-slate-700'} rounded-2xl p-6 shadow-xl transition-all cursor-pointer hover:-translate-y-1`} onClick={() => setFlowStep(1)}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${flowStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}`}>1</div>
                    <span className="font-bold text-white">Bild Generieren</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg text-xs text-slate-400 mb-2">Model: Midjourney v6</div>
                  <p className="text-sm font-mono text-blue-300 line-clamp-2">"A hyperrealistic cyberpunk character..."</p>
                </div>

                <svg className={`w-10 h-10 ${flowStep >= 2 ? 'text-blue-500' : 'text-slate-700'} transform rotate-90 md:rotate-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>

                {/* Step 2 */}
                <div className={`flex-1 bg-slate-800 border-2 ${flowStep >= 2 ? 'border-emerald-500' : 'border-slate-700'} rounded-2xl p-6 shadow-xl transition-all cursor-pointer hover:-translate-y-1`} onClick={() => setFlowStep(2)}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${flowStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-400'}`}>2</div>
                    <span className="font-bold text-white">Video Animieren</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg text-xs text-slate-400 mb-2">Model: Runway Gen-3</div>
                  <p className="text-sm font-mono text-emerald-300 line-clamp-2">Input: [Bild aus Schritt 1]<br/>Motion: Slow camera pan right...</p>
                </div>

                <svg className={`w-10 h-10 ${flowStep >= 3 ? 'text-emerald-500' : 'text-slate-700'} transform rotate-90 md:rotate-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>

                {/* Step 3 */}
                <div className={`flex-1 bg-slate-800 border-2 ${flowStep >= 3 ? 'border-purple-500' : 'border-slate-700'} rounded-2xl p-6 shadow-xl transition-all cursor-pointer hover:-translate-y-1`} onClick={() => setFlowStep(3)}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${flowStep >= 3 ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-400'}`}>3</div>
                    <span className="font-bold text-white">Soundtrack</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg text-xs text-slate-400 mb-2">Model: Suno AI</div>
                  <p className="text-sm font-mono text-purple-300 line-clamp-2">Input: [Video aus Schritt 2]<br/>Prompt: Dark synthwave beat, fast pace...</p>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <button className="bg-white text-black font-extrabold py-4 px-12 rounded-full text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform">
                  ▶ Flow Starten
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- 3. MARKTPLATZ --- */}
        {activeTab === 'marketplace' && (
          <div className="max-w-7xl animate-fade-in mx-auto mt-4">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">💰 Prompt Marktplatz</h2>
                <p className="text-slate-400">Kaufe Premium-Prompts von Experten oder verkaufe deine eigenen Kreationen.</p>
              </div>
              <button className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                Als Creator anmelden
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {marketplacePrompts.map(item => (
                <div key={item.id} className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden flex flex-col group hover:border-amber-500/50 transition-colors">
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-bold bg-slate-900 text-slate-300 px-2 py-1 rounded">{item.category}</span>
                      <span className="text-lg font-black text-amber-400">{item.price}</span>
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2 leading-tight group-hover:text-amber-400 transition-colors">{item.title}</h3>
                    <p className="text-sm text-slate-400 mb-4 line-clamp-3">{item.preview}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-xs">👤</div>
                      <span className="text-xs font-bold text-slate-300">{item.creator}</span>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-700/50 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                        <span>★</span> {item.rating} <span className="text-slate-500 font-normal text-xs ml-1">({item.sales} Käufe)</span>
                      </div>
                      <button className="bg-amber-600/20 hover:bg-amber-600 text-amber-500 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                        Kaufen
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- PLACEHOLDERS FÜR ALTE TABS ZUR ÜBERSICHTLICHKEIT --- */}
        {!['studio', 'flows', 'marketplace'].includes(activeTab) && (
          <div className="max-w-4xl animate-fade-in flex flex-col items-center justify-center h-96 bg-slate-800 rounded-xl border border-slate-700 border-dashed mt-4">
             <h2 className="text-2xl font-bold mb-2 text-slate-300">Neuer Bereich aktiv!</h2>
             <p className="text-slate-500">Klicke auf "Mein Studio", "Automatisierung" oder "Marktplatz" in der Navigation.</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default App