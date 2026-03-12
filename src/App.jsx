import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './supabaseClient'
import {
  tabs as dataTabs,
  communityPrompts,
  marketplacePrompts
} from './data.js'
import { translations } from './i18n.js'

function App() {
  const [lang, setLang] = useState('de')
  const t = translations[lang]

  const [activeTab, setActiveTab] = useState('studio')
  const [activeFolder, setActiveFolder] = useState('Meine Favoriten')
  const [flowStep, setFlowStep] = useState(1)

  const [user, setUser] = useState(null)
  const [likedItems, setLikedItems] = useState({})
  const [copiedItems, setCopiedItems] = useState({})
  
  // NEW: Share Menu State
  const [shareMenuOpen, setShareMenuOpen] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const copyToClipboard = (text, idStr) => {
    navigator.clipboard.writeText(text);
    setCopiedItems(prev => ({ ...prev, [idStr]: true }));
    setTimeout(() => setCopiedItems(prev => ({ ...prev, [idStr]: false })), 2000);
  };

  const toggleLike = (type, id) => {
    const key = `${type}-${id}`;
    setLikedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Generic Share Handler
  const handleShare = (platform, title) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Schau dir diesen Prompt an: ${title} auf Prompt Studio!`);
    
    let shareUrl = '';
    if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    if (platform === 'whatsapp') shareUrl = `https://api.whatsapp.com/send?text=${text} ${url}`;
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    setShareMenuOpen(null); // Close menu after sharing
  };

  // Reusable Share Menu Component
  const ShareMenu = ({ id, title }) => {
    if (shareMenuOpen !== id) return null;
    return (
      <div className="absolute right-0 bottom-full mb-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 w-48 animate-fade-in origin-bottom-right">
        <div className="text-xs font-bold text-slate-500 mb-2 px-2 uppercase tracking-wider">Teilen auf</div>
        <button onClick={() => handleShare('twitter', title)} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-800 rounded-lg text-sm text-slate-200 transition-colors">
          <svg className="w-4 h-4 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
          X (Twitter)
        </button>
        <button onClick={() => handleShare('facebook', title)} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-800 rounded-lg text-sm text-slate-200 transition-colors">
          <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          Facebook
        </button>
        <button onClick={() => handleShare('whatsapp', title)} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-800 rounded-lg text-sm text-slate-200 transition-colors">
          <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp
        </button>
      </div>
    );
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`min-h-screen bg-slate-900 text-slate-100 flex ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      
      {/* Sidebar Navigation */}
      <div className={`w-72 bg-slate-950 border-slate-800 p-6 flex flex-col fixed h-full overflow-y-auto z-20 ${lang === 'ar' ? 'border-l right-0' : 'border-r left-0'}`}>
        <h1 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          {t.appTitle}
        </h1>
        <nav className="flex-1 space-y-1.5">
          {dataTabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'} p-2.5 rounded-lg transition-colors flex flex-col ${activeTab === tab.id ? 'bg-blue-600/20 border border-blue-500/50 text-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <span className="font-semibold text-sm flex items-center justify-between w-full">
                {t.tabs[tab.id] || tab.name}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <div className={`flex-1 p-8 ${lang === 'ar' ? 'mr-72' : 'ml-72'}`}>

        {/* --- 1. MEIN STUDIO (MIT SHARE BUTTONS) --- */}
        {activeTab === 'studio' && (
          <div className="max-w-7xl animate-fade-in mx-auto mt-4">
            <h2 className="text-3xl font-bold mb-8">📂 Mein Studio</h2>
            <div className="flex gap-8">
              <div className="w-64 space-y-2">
                {['Meine Favoriten', 'Projekt X'].map(folder => (
                  <button key={folder} onClick={() => setActiveFolder(folder)} className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${activeFolder === folder ? 'bg-slate-800 text-blue-400 font-bold border border-slate-700' : 'text-slate-400 hover:bg-slate-800/50'}`}>
                    {folder}
                  </button>
                ))}
              </div>
              
              <div className="flex-1 bg-slate-800/30 border border-slate-700 rounded-3xl p-8 min-h-[500px]">
                <h3 className="text-xl font-bold text-white mb-8 border-b border-slate-700 pb-4">{activeFolder}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {communityPrompts.slice(0,2).map(item => (
                    <div key={item.id} className="bg-slate-800 rounded-xl border border-slate-700 p-4 relative group">
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        
                        {/* SHARE BUTTON CONTAINER */}
                        <div className="relative">
                          <button 
                            onClick={() => setShareMenuOpen(shareMenuOpen === `studio-${item.id}` ? null : `studio-${item.id}`)}
                            className="p-1.5 bg-slate-700 rounded text-slate-300 hover:text-white hover:bg-blue-600 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                          </button>
                          <ShareMenu id={`studio-${item.id}`} title={item.title} />
                        </div>

                        <button className="p-1.5 bg-slate-700 rounded text-red-400 hover:bg-red-500/20">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1 block">Prompt</span>
                      <h4 className="font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-xs font-mono text-slate-400 line-clamp-3 mb-4">{item.prompt}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- MARKTPLATZ (MIT SHARE BUTTON) --- */}
        {activeTab === 'marketplace' && (
          <div className="max-w-7xl animate-fade-in mx-auto mt-4">
            <h2 className="text-3xl font-bold mb-8">💰 Prompt Marktplatz</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {marketplacePrompts.map(item => (
                <div key={item.id} className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden flex flex-col group hover:border-amber-500/50 transition-colors relative">
                  
                  {/* SHARE BUTTON TOP RIGHT */}
                  <div className="absolute top-4 right-4 z-10">
                    <button onClick={() => setShareMenuOpen(shareMenuOpen === `market-${item.id}` ? null : `market-${item.id}`)} className="p-2 bg-slate-900/80 backdrop-blur rounded-full text-slate-300 hover:text-white hover:bg-amber-600 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                    </button>
                    <ShareMenu id={`market-${item.id}`} title={item.title} />
                  </div>

                  <div className="p-5 flex flex-col flex-grow pt-10">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-bold bg-slate-900 text-slate-300 px-2 py-1 rounded">{item.category}</span>
                      <span className="text-lg font-black text-amber-400">{item.price}</span>
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-400 mb-4 line-clamp-3">{item.preview}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- PLACEHOLDER FOR OTHERS --- */}
        {!['studio', 'marketplace'].includes(activeTab) && (
          <div className="max-w-4xl animate-fade-in flex flex-col items-center justify-center h-96 bg-slate-800 rounded-xl border border-slate-700 border-dashed mt-4">
             <h2 className="text-2xl font-bold mb-2 text-slate-300">Share-Buttons hinzugefügt!</h2>
             <p className="text-slate-500">Schau dir den "Mein Studio" oder "Marktplatz" Tab an, um das neue Teilen-Feature (X, Facebook, WhatsApp) zu sehen.</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default App