import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './supabaseClient'
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

function App() {
  const [lang, setLang] = useState('de')
  const t = translations[lang]

  const [activeTab, setActiveTab] = useState('auth') // Starten wir bei Auth zum Testen
  
  // States
  const [musicSearch, setMusicSearch] = useState('')
  const [repairSearch, setRepairSearch] = useState('')
  const [learningSearch, setLearningSearch] = useState('')
  const [genPrompt, setGenPrompt] = useState('')
  const [genType, setGenType] = useState('image')
  const [isGenerating, setIsGenerating] = useState(false)
  const [genResult, setGenResult] = useState(null)
  
  const [extractorStatus, setExtractorStatus] = useState('idle')
  const [extractedText, setExtractedText] = useState('')
  
  const [mixerSubject, setMixerSubject] = useState('')
  const [mixerStyle, setMixerStyle] = useState('')
  const [mixerLight, setMixerLight] = useState('')
  const [mixerCamera, setMixerCamera] = useState('')
  
  const [comparePrompt, setComparePrompt] = useState('A futuristic cyberpunk city at night with flying cars and neon lights, highly detailed, photorealistic')
  
  // === AUTH STATES ===
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authName, setAuthName] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState(null)
  const [user, setUser] = useState(null) // Speichert den aktuell eingeloggten Nutzer

  // Likes & Copy
  const [likedItems, setLikedItems] = useState({})
  const [copiedItems, setCopiedItems] = useState({})

  // === SUPABASE AUTHENTICATION ===
  useEffect(() => {
    // Check aktiven Nutzer beim Laden
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Höre auf Login/Logout Events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleAuth = async (e) => {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError(null)

    try {
      if (isLoginMode) {
        // LOGIN
        const { error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword,
        })
        if (error) throw error
        // Bei Erfolg wird der useEffect Trigger ausgelöst
      } else {
        // REGISTRIERUNG
        const { error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword,
          options: {
            data: {
              full_name: authName
            }
          }
        })
        if (error) throw error
        alert('Registrierung erfolgreich! Bitte prüfe deine E-Mails, falls Email-Bestätigung in Supabase aktiviert ist (Standard). Ansonsten bist du jetzt eingeloggt.')
      }
    } catch (error) {
      setAuthError(error.message)
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setActiveTab('generator')
  }
  // === ENDE AUTH ===

  const copyToClipboard = (text, idStr) => {
    navigator.clipboard.writeText(text);
    setCopiedItems(prev => ({ ...prev, [idStr]: true }));
    setTimeout(() => setCopiedItems(prev => ({ ...prev, [idStr]: false })), 2000);
  };

  const toggleLike = (type, id) => {
    const key = `${type}-${id}`;
    setLikedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Reusable Prompt Card (Verkürzt für UI-Darstellung in dieser Demo)
  const PromptCard = ({ item, type, hoverColorClass }) => {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col h-40 items-center justify-center text-slate-500">
         <p>Prompt Card Placeholder</p>
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
        
        {/* User Profile Mini-Badge in Sidebar */}
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

        {/* --- ECHTER AUTH / LOGIN TAB --- */}
        {activeTab === 'auth' && (
          <div className="max-w-md mx-auto mt-10 animate-fade-in">
            {user ? (
              // BEREITS EINGELOGGT ANSICHT
              <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl text-center">
                 <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-emerald-400 rounded-full flex items-center justify-center font-bold text-white text-3xl mx-auto mb-6 shadow-lg">
                    {user.user_metadata?.full_name ? user.user_metadata.full_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                 </div>
                 <h2 className="text-2xl font-bold mb-2 text-white">Willkommen zurück!</h2>
                 <p className="text-slate-400 mb-6">{user.email}</p>
                 
                 <div className="grid grid-cols-2 gap-4 mb-8">
                   <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                      <span className="block text-2xl font-bold text-blue-400">0</span>
                      <span className="text-xs text-slate-500 uppercase font-bold">Gespeicherte Prompts</span>
                   </div>
                   <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                      <span className="block text-2xl font-bold text-red-400">0</span>
                      <span className="text-xs text-slate-500 uppercase font-bold">Likes vergeben</span>
                   </div>
                 </div>

                 <button onClick={handleLogout} className="w-full bg-slate-900 border border-slate-700 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 text-slate-300 font-bold py-3 px-4 rounded-xl transition-all">
                    Ausloggen
                 </button>
              </div>
            ) : (
              // LOGIN / REGISTRIEREN FORMULAR
              <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>

                <div className="text-center mb-8 relative z-10">
                  <div className="w-16 h-16 bg-slate-900 border border-slate-700 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </div>
                  <h2 className="text-3xl font-bold mb-2 text-white tracking-tight">{isLoginMode ? 'Willkommen zurück' : 'Account erstellen'}</h2>
                  <p className="text-slate-400">Speichere deine Prompts in der Cloud.</p>
                </div>

                {authError && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm relative z-10 text-center">
                    {authError}
                  </div>
                )}

                <form className="space-y-4 relative z-10" onSubmit={handleAuth}>
                  {!isLoginMode && (
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Dein Name</label>
                      <input type="text" value={authName} onChange={(e) => setAuthName(e.target.value)} required placeholder="z.B. Houcem" className="w-full bg-slate-900/50 border border-slate-600 rounded-xl p-3.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">E-Mail Adresse</label>
                    <input type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} required placeholder="name@beispiel.de" className="w-full bg-slate-900/50 border border-slate-600 rounded-xl p-3.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5 ml-1">
                      <label className="block text-sm font-medium text-slate-300">Passwort</label>
                      {isLoginMode && <button type="button" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">Vergessen?</button>}
                    </div>
                    <input type="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} required placeholder="••••••••" minLength="6" className="w-full bg-slate-900/50 border border-slate-600 rounded-xl p-3.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" />
                    {!isLoginMode && <p className="text-xs text-slate-500 mt-2 ml-1">Mindestens 6 Zeichen erforderlich.</p>}
                  </div>

                  <button disabled={authLoading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold py-4 px-4 rounded-xl transition-all mt-4 shadow-lg shadow-blue-900/40 hover:shadow-blue-900/60 transform hover:-translate-y-0.5 flex justify-center items-center gap-2">
                    {authLoading && <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                    {isLoginMode ? 'Sicher einloggen' : 'Kostenlos Account erstellen'}
                  </button>
                </form>

                <div className="mt-8 text-center text-slate-400 text-sm relative z-10">
                  {isLoginMode ? 'Neu bei Prompt Studio? ' : 'Bereits registriert? '}
                  <button onClick={() => setIsLoginMode(!isLoginMode)} className="text-blue-400 hover:text-blue-300 font-bold transition-colors">
                    {isLoginMode ? 'Jetzt registrieren' : 'Hier einloggen'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- PLACEHOLDERS FOR OLD TABS --- */}
        {activeTab !== 'auth' && (
          <div className="max-w-4xl animate-fade-in flex flex-col items-center justify-center h-96 bg-slate-800 rounded-xl border border-slate-700 border-dashed mt-4">
             <h2 className="text-2xl font-bold mb-2 text-slate-300">Dieser Bereich ist in Ordnung</h2>
             <p className="text-slate-500">Gehe auf den <span className="text-blue-400 font-bold">🔐 Login / Profil</span> Tab in der Sidebar, um das neue ECHTE Login-System mit deiner Datenbank zu testen!</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default App