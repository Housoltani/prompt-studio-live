import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './supabaseClient'
import OpenAI from 'openai' // NEU: OpenAI Import
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
  communityPrompts
} from './data.js'
import { translations } from './i18n.js'

// Initialisiere OpenAI (dangerouslyAllowBrowser ist nur für Prototypen lokal gedacht)
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true 
});

function App() {
  const [lang, setLang] = useState('de')
  const t = translations[lang]

  const [activeTab, setActiveTab] = useState('generator') // Wir starten beim Live Generator
  
  // States
  const [musicSearch, setMusicSearch] = useState('')
  const [repairSearch, setRepairSearch] = useState('')
  const [learningSearch, setLearningSearch] = useState('')
  
  // === ECHTE KI GENERATOR STATES ===
  const [genPrompt, setGenPrompt] = useState('')
  const [genType, setGenType] = useState('image')
  const [isGenerating, setIsGenerating] = useState(false)
  const [genResult, setGenResult] = useState(null)
  const [genError, setGenError] = useState(null)
  
  const [extractorStatus, setExtractorStatus] = useState('idle')
  const [extractedText, setExtractedText] = useState('')
  
  // Auth & Globals
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [user, setUser] = useState(null)
  const [likedItems, setLikedItems] = useState({})
  const [copiedItems, setCopiedItems] = useState({})

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  // === ECHTE KI FUNKTION ===
  const handleGenerate = async () => {
    if (!genPrompt.trim()) return;
    setIsGenerating(true);
    setGenResult(null);
    setGenError(null);
    
    try {
      if (genType === 'image') {
        // DALL-E 3 API Aufruf
        const response = await openai.images.generate({
          model: "dall-e-3",
          prompt: genPrompt,
          n: 1,
          size: "1024x1024",
          quality: "standard",
        });

        if (response.data && response.data.length > 0) {
          setGenResult({
            type: 'image',
            url: response.data[0].url
          });
        }
      } else {
        // Text-Simulation für Video/Audio (Da OpenAI keine direkte Video/Audio API wie Sora aktuell offen anbietet)
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: `You are an expert prompt engineer. The user wants to create a ${genType}. Write a highly detailed, professional prompt for a ${genType} generator based on their idea. Just return the prompt text, nothing else.` },
            { role: "user", content: genPrompt }
          ]
        });

        setGenResult({
          type: 'text',
          url: null,
          text: response.choices[0].message.content,
          originalType: genType
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      setGenError("Ein Fehler ist aufgetreten: " + (error.message || "API verweigert."));
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text, idStr) => {
    navigator.clipboard.writeText(text);
    setCopiedItems(prev => ({ ...prev, [idStr]: true }));
    setTimeout(() => setCopiedItems(prev => ({ ...prev, [idStr]: false })), 2000);
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`min-h-screen bg-slate-900 text-slate-100 flex ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      
      {/* Sidebar Navigation */}
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
          {dataTabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'} p-2.5 rounded-lg transition-colors flex flex-col ${activeTab === tab.id ? 'bg-blue-600/20 border border-blue-500/50 text-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <span className="font-semibold text-sm">{t.tabs[tab.id] || tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className={`flex-1 p-8 ${lang === 'ar' ? 'mr-72' : 'ml-72'}`}>

        {/* --- TAB: ECHTER LIVE GENERATOR (DALL-E 3) --- */}
        {activeTab === 'generator' && (
          <div className="max-w-5xl animate-fade-in mx-auto mt-4">
            <div className="flex items-center gap-3 mb-2">
               <h2 className="text-3xl font-bold">{t.generatorTitle}</h2>
               <span className="bg-blue-600/20 border border-blue-500/50 text-blue-400 text-xs px-2 py-1 rounded font-bold">POWERED BY DALL-E 3</span>
            </div>
            <p className="text-slate-400 mb-8">{t.generatorDesc}</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              
              {/* INPUT AREA */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                  <label className="block text-sm font-bold text-slate-300 mb-3">{t.whatToCreate}</label>
                  <textarea 
                    value={genPrompt} 
                    onChange={(e) => setGenPrompt(e.target.value)} 
                    placeholder="z.B. Ein futuristisches Raumschiff, das durch eine Neon-Stadt fliegt..." 
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-4 text-slate-200 h-40 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-4" 
                    dir="ltr" 
                  />
                  
                  <div className="flex gap-2 mb-6">
                    <button onClick={() => setGenType('image')} className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${genType === 'image' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-600 text-slate-400 hover:text-slate-200'}`}>🖼️ Bild</button>
                    <button onClick={() => setGenType('video')} className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${genType === 'video' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-600 text-slate-400 hover:text-slate-200'}`}>🎥 Video</button>
                    <button onClick={() => setGenType('music')} className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${genType === 'music' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-900 border-slate-600 text-slate-400 hover:text-slate-200'}`}>🎵 Musik</button>
                  </div>
                  
                  <button onClick={handleGenerate} disabled={isGenerating || !genPrompt.trim()} className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 text-lg shadow-lg hover:shadow-blue-900/50 transition-all hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:shadow-none">
                    {isGenerating ? (
                       <>
                         <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                         Generiert mit KI...
                       </>
                    ) : t.generateBtn}
                  </button>

                  {genError && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg">
                      {genError}
                    </div>
                  )}
                </div>
              </div>
              
              {/* OUTPUT AREA */}
              <div className="lg:col-span-3">
                <div className="bg-slate-800 p-2 rounded-xl border border-slate-700 h-full min-h-[400px] flex items-center justify-center relative overflow-hidden group">
                  
                  {!isGenerating && !genResult && (
                     <div className="text-center text-slate-500 flex flex-col items-center">
                        <svg className="w-16 h-16 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <p>{t.resultPlaceholder}</p>
                     </div>
                  )}
                  
                  {isGenerating && (
                     <div className="text-center text-blue-400 flex flex-col items-center z-10">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="font-medium animate-pulse">DALL-E 3 berechnet dein Bild... (ca. 10s)</p>
                     </div>
                  )}
                  
                  {genResult && !isGenerating && (
                    <div className="w-full h-full animate-fade-in relative flex items-center justify-center rounded-lg overflow-hidden bg-slate-950">
                      
                      {/* ECHTES BILD VON DALL-E */}
                      {genResult.type === 'image' && (
                        <>
                           <img src={genResult.url} alt="AI Generated" className="w-full h-full object-contain" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                              <a href={genResult.url} target="_blank" rel="noreferrer" className="bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-slate-200 transition-transform hover:scale-105 shadow-xl">
                                Download High-Res
                              </a>
                           </div>
                        </>
                      )}

                      {/* TEXT PROMPT FÜR VIDEO/AUDIO */}
                      {genResult.type === 'text' && (
                        <div className="p-8 w-full">
                           <h3 className="text-emerald-400 font-bold text-lg mb-4 flex items-center gap-2">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                             Optimierter {genResult.originalType === 'video' ? 'Video' : 'Musik'} Prompt generiert:
                           </h3>
                           <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl font-mono text-slate-300 text-sm whitespace-pre-wrap leading-relaxed" dir="ltr">
                              {genResult.text}
                           </div>
                           <button onClick={() => copyToClipboard(genResult.text, 'ai-prompt')} className="mt-6 w-full bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold py-3 rounded-xl transition-colors">
                              {copiedItems['ai-prompt'] ? 'Kopiert!' : 'Diesen Prompt kopieren'}
                           </button>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- ALTE TABS WERDEN AUSGEBLENDET (NUR FÜR DIE DEMO HIER GEKÜRZT) --- */}
        {activeTab !== 'generator' && (
          <div className="max-w-4xl animate-fade-in flex flex-col items-center justify-center h-96 bg-slate-800 rounded-xl border border-slate-700 border-dashed mt-4">
             <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🚀</span>
             </div>
             <h2 className="text-2xl font-bold mb-2 text-slate-200">Die KI ist live!</h2>
             <p className="text-slate-400 text-center max-w-md">Klicke in der Seitenleiste auf <span className="text-blue-400 font-bold">✨ Live Generator</span>, um echte DALL-E 3 Bilder zu generieren!</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default App