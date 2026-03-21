import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import './App.css'
import { supabase } from './supabaseClient'
import {
  tabs as dataTabs,
  communityPrompts as dummyCommunityPrompts,
  marketplacePrompts as dummyMarketplacePrompts
} from './data.js'
import { translations } from './i18n.js'
import { CreditsProvider, useCredits } from './context/CreditsContext'
import InteractivePrompt from './components/InteractivePrompt'
import GlobalChat from './components/GlobalChat'
const PromptMixer = lazy(() => import('./components/PromptMixer'))
const AssetLab = lazy(() => import('./components/AssetLab'))
const LiveGenerator = lazy(() => import('./components/LiveGenerator'))
const PromptExtractor = lazy(() => import('./components/PromptExtractor'))
const VideoGenerator = lazy(() => import('./components/VideoGenerator'))
const ModelCompare = lazy(() => import('./components/ModelCompare'))
const MusicGenerator = lazy(() => import('./components/MusicGenerator'))
const CommunityFeed = lazy(() => import('./components/CommunityFeed'))
const AgentsHub = lazy(() => import('./components/AgentsHub'))
const CommandCenter = lazy(() => import('./components/CommandCenter'))
const FlowBuilder = lazy(() => import('./components/FlowBuilder'))
const EbookStudio = lazy(() => import('./components/EbookStudio'))
const AuthProfile = lazy(() => import('./components/AuthProfile'))
const NotebookLM = lazy(() => import('./components/NotebookLM'))
const CommandDashboard = lazy(() => import('./components/CommandDashboard'))
const CreatorDashboard = lazy(() => import('./components/CreatorDashboard'))
const EarnCredits = lazy(() => import('./components/EarnCredits'))
const Pricing = lazy(() => import('./components/Pricing'))
const AIAcademy = lazy(() => import('./components/AIAcademy'))
const Studio = lazy(() => import('./components/Studio'))
const Marketplace = lazy(() => import('./components/Marketplace'))
const ImageLibrary = lazy(() => import('./components/ImageLibrary'))
const VideoLibrary = lazy(() => import('./components/VideoLibrary'))
const MusicLibrary = lazy(() => import('./components/MusicLibrary'))
const Feedback = lazy(() => import('./components/Feedback'))
const Offers = lazy(() => import('./components/Offers'))
const PromptArena = lazy(() => import('./components/PromptArena'))
const AITrendsRadar = lazy(() => import('./components/AITrendsRadar'))
const ApiNexus = lazy(() => import('./components/ApiNexus'))
const VoiceAvatarStudio = lazy(() => import('./components/VoiceAvatarStudio'))
const DevArchitect = lazy(() => import('./components/DevArchitect'))
const PromptVersioning = lazy(() => import('./components/PromptVersioning'))
const AIStoryboard = lazy(() => import('./components/AIStoryboard'))
const SideHustleRadar = lazy(() => import('./components/SideHustleRadar'))
const AIAgencyBlueprint = lazy(() => import('./components/AIAgencyBlueprint'))
const DigitalProductArchitect = lazy(() => import('./components/DigitalProductArchitect'))

import { useLanguage } from "./context/LanguageContext";
function AppContent() {
  const { lang, setLang, t } = useLanguage();
  
  const { credits } = useCredits()

  const [user, setUser] = useState(null)
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('')
  
  // MOCK SEARCH DATA for Cmd+K
  const commandPaletteLinks = [
    { title: 'Generieren: Universal Live Studio', url: '/app/live', icon: '✨', type: 'Tool' },
    { title: 'Bibliothek: Bilder (Midjourney, DALL-E)', url: '/app/images', icon: '🖼️', type: 'Bib' },
    { title: 'Bibliothek: Videos (Kling, Sora)', url: '/app/videos', icon: '🎥', type: 'Bib' },
    { title: 'Bibliothek: Musik & Audio', url: '/app/music', icon: '🎵', type: 'Bib' },
    { title: 'Lernen: Prompt Academy (Masterclass)', url: '/app/learning', icon: '🎓', type: 'Wissen' },
    { title: 'Community: Globaler Feed', url: '/app/community', icon: '🌍', type: 'Netzwerk' },
    { title: 'Workflow: Visual Flow Builder', url: '/app/flows', icon: '⚡', type: 'Tool' },
    { title: 'Hilfe: Bug Report & Feedback', url: '/app/feedback', icon: '💬', type: 'System' }
  ];

  // Command Palette State
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [cmdSearchQuery, setCmdSearchQuery] = useState('');

  // Global Keyboard Listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen]);

  
  // NEW: Share Menu State
  const [shareMenuOpen, setShareMenuOpen] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState(() => {
    const saved = localStorage.getItem('promptStudioMenuState');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore parsing errors
      }
    }
    return {
      'KREATION & TOOLS': true,
      'BIBLIOTHEKEN': true,
      'AGENTEN & WORKFLOWS': true,
      'COMMUNITY & VERKAUF': false,
      'SYSTEM & PROFIL': false
    };
  });

  useEffect(() => {
    localStorage.setItem('promptStudioMenuState', JSON.stringify(expandedCategories));
  }, [expandedCategories]);

  const toggleCategory = (cat) => {
    setExpandedCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }))
  }

  useEffect(() => {
    // 1. Auth Listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    // 2. Fetch Data from Supabase
    const fetchPrompts = async () => {
      try {
        setIsLoadingPrompts(true)
        const { data, error } = await supabase
          .from('prompts')
          .select('*, profiles(username)')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Fehler beim Laden der Prompts aus Supabase:', error)
          setIsLoadingPrompts(false)
          return
        }

        if (data && data.length > 0) {
          // Map to local structure
          const dbCommunity = data.filter(p => Number(p.price) === 0).map(p => ({
            id: p.id,
            title: p.title,
            prompt: p.content,
            category: p.category || 'Allgemein',
            likes: p.likes_count,
            views: p.views_count
          }))
          const dbMarket = data.filter(p => Number(p.price) > 0).map(p => ({
            id: p.id,
            title: p.title,
            preview: p.description || p.content,
            category: p.category || 'Allgemein',
            price: Number(p.price).toFixed(2) + '€',
            creator: p.profiles?.username || '@Anonym',
            sales: 0,
            rating: 5.0
          }))

          if (dbCommunity.length > 0) setCommunityPrompts(dbCommunity)
          if (dbMarket.length > 0) setMarketplacePrompts(dbMarket)
        }
      } catch (err) {
        console.error('Unerwarteter Fehler beim Abrufen der Prompts:', err)
      } finally {
        setIsLoadingPrompts(false)
      }
    }

    fetchPrompts()

  
  return () => subscription.unsubscribe()
  }, [])

  const copyToClipboard = (text, idStr) => {
    navigator.clipboard.writeText(text);
    toast.success('Prompt kopiert!', {
      style: {
        borderRadius: '10px',
        background: '#1e293b',
        color: '#f8fafc',
        border: '1px solid #334155',
      },
      iconTheme: {
        primary: '#34d399',
        secondary: '#1e293b',
      },
    });
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


  const handleBuyPrompt = (title) => {
    if (!user) {
      toast.error('Bitte logge dich ein, um Prompts zu kaufen.', {
        icon: '🔐',
        style: { background: '#1e293b', color: '#fff' }
      });
      // Optional: Navigation to /app/auth could be done here, but we'll stick to a toast
      return;
    }
    const toastId = toast.loading('Verarbeite Zahlung für ' + title + '...');
    setTimeout(() => {
      toast.success(title + ' erfolgreich gekauft! Ab ins Studio.', {
        id: toastId,
        icon: '💰',
        style: { background: '#10b981', color: '#fff' }
      });
    }, 1500);
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`min-h-screen bg-slate-900 text-slate-100 flex selection:bg-blue-500/30 selection:text-white ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      <Toaster position="bottom-right" reverseOrder={false} />
      <GlobalChat />

      {/* --- MOBILE OVERLAY --- */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 glass-panel border-b border-slate-800/50 z-20 flex items-center justify-between px-4 shadow-lg">
        <h1 className="text-xl font-extrabold text-gradient from-blue-400 via-indigo-400 to-emerald-400 tracking-tight">
          {t.appTitle || "Prompt Studio"}
        </h1>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-2 text-slate-300 hover:text-white bg-slate-800/80 rounded-lg border border-slate-700 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>

      
      {/* Sidebar Navigation */}
      <div className={`w-72 glass-panel border-r border-slate-800/50 p-6 flex flex-col fixed h-full overflow-y-auto z-40 shadow-[4px_0_24px_-10px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-in-out ${lang === 'ar' ? 'border-l right-0' : 'border-r left-0'} ${isMobileMenuOpen ? 'translate-x-0' : (lang === 'ar' ? 'translate-x-full md:translate-x-0' : '-translate-x-full md:translate-x-0')}`}>
        <h1 className="text-3xl font-extrabold mb-4 text-gradient from-blue-400 via-indigo-400 to-emerald-400 tracking-tight">
          {t.appTitle}
        </h1>

        {/* 7-Day Overdrive Trial Badge */}
        <div className="mb-8 p-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl relative overflow-hidden group cursor-pointer hover:border-amber-500/60 transition-colors">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500 opacity-70"></div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center text-lg animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              🚀
            </div>
            <div>
              <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest">Overdrive Aktiv</h4>
              <p className="text-[10px] text-slate-400 font-bold">6 Tage verbleibend</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-4">
          {Object.entries(
            dataTabs.reduce((acc, tab) => {
              const cat = tab.category || 'MENÜ';
              if (!acc[cat]) acc[cat] = [];
              acc[cat].push(tab);
              return acc;
            }, {})
          ).map(([category, tabs]) => {
            const isExpanded = expandedCategories[category] !== false;
            return (
            <div key={t.categories?.[category] || category} className="mb-4">
              <div 
                onClick={() => toggleCategory(category)}
                className="flex items-center justify-between cursor-pointer group px-2 py-1.5 mb-1 rounded-md hover:bg-slate-800/40 transition-colors"
              >
                <h3 className="text-[10px] font-black text-slate-400 group-hover:text-slate-300 uppercase tracking-[0.2em] transition-colors">
                  {t.categories?.[category] || category}
                </h3>
                <svg 
                  className={`w-3.5 h-3.5 text-slate-500 group-hover:text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div 
                className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out origin-top ${isExpanded ? 'max-h-[800px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'}`}
              >
                {tabs.map(tab => (
                  <NavLink
                    key={tab.id}
                    to={`/app/${tab.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `w-full ${lang === 'ar' ? 'text-right' : 'text-left'} p-2.5 rounded-lg transition-all flex flex-col ${isActive ? 'bg-blue-600/20 border border-blue-500/50 text-blue-400 font-bold shadow-inner' : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200 border border-transparent hover:border-slate-700/50'}`
                    }
                  >
                    <span className="font-semibold text-sm flex items-center justify-between w-full">
                      {t.tabs[tab.id] || tab.name}
                    </span>
                  </NavLink>
                ))}
              </div>
            </div>
          )}
          )}
        </nav>
        
        {/* --- LANGUAGE SWITCHER --- */}
        <div className="mt-8 border-t border-slate-700/50 pt-4 flex justify-between gap-2">
          <button onClick={() => setLang('de')} className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${lang === 'de' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>DE</button>
          <button onClick={() => setLang('en')} className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${lang === 'en' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>EN</button>
          <button onClick={() => setLang('ar')} className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${lang === 'ar' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>AR</button>
        </div>
      </div>

      <div className={`flex-1 p-4 md:p-8 pt-20 md:pt-8 transition-all duration-300 ${lang === 'ar' ? 'md:mr-72' : 'md:ml-72'}`}>

        {/* --- GLOBAL SEARCH BAR (HEADER) --- */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between mb-8 sticky top-16 md:top-0 glass-panel z-10 py-4 px-4 md:px-6 rounded-2xl border border-slate-700/50 md:mt-4 shadow-lg gap-4">
          <div className="relative w-full md:w-[400px]">
            <svg className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input 
              type="text" 
              placeholder="Suche nach Prompts, Kategorien..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner"
            />
          </div>
          <div className="flex items-center gap-4">
             
             <NavLink to="/app/credits" className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full text-sm font-bold transition-colors">
               <span className="animate-pulse">⚡</span> {credits} Sparks
             </NavLink>
             {user ? (
                <div className="flex items-center gap-3 bg-slate-800/50 pl-3 pr-1 py-1 rounded-full border border-slate-700">
                  <span className="text-sm font-bold text-slate-300 ml-2">{user.email.split('@')[0]}</span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 flex items-center justify-center text-xs font-bold shadow-md">
                    {user.email[0].toUpperCase()}
                  </div>
                </div>
             ) : (
                <NavLink to="/app/auth" className="text-sm font-bold bg-blue-600/20 text-blue-400 border border-blue-500/50 px-4 py-2 rounded-xl hover:bg-blue-600/40 transition-colors">
                  Einloggen
                </NavLink>
             )}
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="home" replace />} />
          
        <Route path="analytics" element={<Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        }><CreatorDashboard /></Suspense>} />

          
        <Route path="notebook" element={<Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        }><NotebookLM /></Suspense>} />

          
        <Route path="home" element={<Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        }><CommandDashboard /></Suspense>} />

          {/* --- 1. MEIN STUDIO (MIT SHARE BUTTONS) --- */}
        <Route path="studio" element={<Suspense fallback={
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  }><Studio /></Suspense>} />

        {/* --- MARKTPLATZ (MIT SHARE BUTTON) --- */}
        <Route path="marketplace" element={
  <Suspense fallback={
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
    </div>
  }><Marketplace /></Suspense>} />
        {/* --- KI BILDER BIBLIOTHEK --- */}
        <Route path="images" element={
          <Suspense fallback={
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          }><ImageLibrary /></Suspense>
        } />


        {/* --- PROMPT MIXER --- */}
        <Route path="mixer" element={
  <Suspense fallback={
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  }><PromptMixer /></Suspense>} />

        {/* --- ASSET LAB --- */}
        <Route path="assetlab" element={
  <Suspense fallback={
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
    </div>
  }><AssetLab /></Suspense>} />

        {/* --- LIVE GENERATOR --- */}
        <Route path="generator" element={
  <Suspense fallback={
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  }><LiveGenerator /></Suspense>} />

        {/* --- PROMPT EXTRACTOR --- */}
        <Route path="extractor" element={
  <Suspense fallback={
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  }><PromptExtractor /></Suspense>} />

        {/* --- VIDEO GENERATOR --- */}
        {/* --- KI VIDEO BIBLIOTHEK --- */}
        <Route path="videos" element={
          <Suspense fallback={
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
          }><VideoLibrary /></Suspense>
        } />

        {/* --- MODEL COMPARE --- */}
        <Route path="compare" element={
  <Suspense fallback={
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  }><ModelCompare /></Suspense>} />

        {/* --- MUSIC GENERATOR --- */}
        {/* --- KI MUSIK BIBLIOTHEK --- */}
        <Route path="music" element={
          <Suspense fallback={
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
          }><MusicLibrary /></Suspense>
        } />

        {/* --- COMMUNITY FEED --- */}
        <Route path="community" element={
  <Suspense fallback={
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  }><CommunityFeed /></Suspense>} />

        {/* --- FLOW BUILDER --- */}
        <Route path="flows" element={
  <Suspense fallback={
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  }><FlowBuilder /></Suspense>} />

        
        {/* --- AUTH / PROFILE --- */}
        <Route path="auth" element={
  <Suspense fallback={
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  }><AuthProfile /></Suspense>} />

        
        {/* --- AGENTEN HUB --- */}
                <Route path="command-center" element={
          <Suspense fallback={
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          }><CommandCenter /></Suspense>
        } />
        <Route path="ebook-studio" element={
          <Suspense fallback={
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          }><EbookStudio /></Suspense>
        } />
        <Route path="agents" element={
  <Suspense fallback={
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  }><AgentsHub /></Suspense>} />

        
        {/* --- EARN CREDITS --- */}
        <Route path="credits" element={<Suspense fallback={
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  }><EarnCredits /></Suspense>} />

        {/* --- PRICING --- */}
        <Route path="pricing" element={<Suspense fallback={
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
    </div>
  }><Pricing /></Suspense>} />

        {/* --- KI ACADEMY (LEARNING) --- */}
        <Route path="learning" element={<Suspense fallback={
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
    </div>
  }><AIAcademy /></Suspense>} />

        {/* --- PROMPT ARENA --- */}
        <Route path="arena" element={<Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
        }><PromptArena /></Suspense>} />

        {/* --- KI TRENDS RADAR --- */}
        <Route path="radar" element={<Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          </div>
        }><AITrendsRadar /></Suspense>} />

        {/* --- API NEXUS --- */}
        <Route path="api-nexus" element={<Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        }><ApiNexus /></Suspense>} />

        {/* --- FEEDBACK --- */}
        <Route path="feedback" element={<Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        }><Feedback /></Suspense>} />

        {/* --- OFFERS --- */}
        <Route path="offers" element={<Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          </div>
        }><Offers /></Suspense>} />

        <Route path="voice-avatar" element={<Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        }><VoiceAvatarStudio /></Suspense>} />

        <Route path="dev-architect" element={<Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        }><DevArchitect /></Suspense>} />

        <Route path="storyboard" element={<Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-500"></div>
          </div>
        }><AIStoryboard /></Suspense>} />

        <Route path="side-hustle" element={<Suspense fallback={ <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div></div> }><SideHustleRadar /></Suspense>} />
        <Route path="agency-blueprint" element={<Suspense fallback={ <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div></div> }><AIAgencyBlueprint /></Suspense>} />
        <Route path="digital-product" element={<Suspense fallback={ <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div></div> }><DigitalProductArchitect /></Suspense>} />

        <Route path="prompt-versioning" element={<Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        }><PromptVersioning /></Suspense>} />

        {/* --- PLACEHOLDER FOR OTHERS --- */}
        <Route path="*" element={<>
          <div className="max-w-4xl animate-fade-in flex flex-col items-center justify-center h-96 bg-slate-800 rounded-xl border border-slate-700 border-dashed mt-4">
             <h2 className="text-2xl font-bold mb-2 text-slate-300">Share-Buttons hinzugefügt!</h2>
             <p className="text-slate-500">Schau dir den "Mein Studio" oder "Marktplatz" Tab an, um das neue Teilen-Feature (X, Facebook, WhatsApp) zu sehen.</p>
          </div>
          </>} />
        </Routes>

      </div>

      {/* Zentrales Matrix-Suchsystem (Kommando-Palette) */}
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 backdrop-blur-md bg-slate-900/60 transition-opacity">
          <div className="w-full max-w-2xl bg-slate-800/90 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden glass-panel">
            <div className="flex items-center px-4 py-3 border-b border-slate-700/50">
              <svg className="w-5 h-5 text-slate-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                autoFocus
                placeholder="Suche in der Matrix... (Bilder, Videos, Musik, Tools)"
                value={cmdSearchQuery}
                onChange={(e) => setCmdSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-slate-200 placeholder-slate-500 font-medium"
              />
              <button 
                onClick={() => setIsCommandPaletteOpen(false)}
                className="text-xs bg-slate-700/50 px-2 py-1 rounded text-slate-400 hover:text-white"
              >
                ESC
              </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto p-2">
              {cmdSearchQuery ? (
                <div className="space-y-1">
                  <div className="px-3 py-2 text-xs font-black text-slate-500 uppercase tracking-widest">Gefundene Protokolle</div>
                  {commandPaletteLinks
                    .filter(link => link.title.toLowerCase().includes(cmdSearchQuery.toLowerCase()))
                    .map((link, i) => (
                      <div 
                        key={i}
                        onClick={() => {
                          navigate(link.url);
                          setIsCommandPaletteOpen(false);
                          setCmdSearchQuery('');
                        }}
                        className="flex items-center justify-between p-3 bg-slate-800/50 hover:bg-blue-600/20 hover:border-blue-500/50 border border-transparent rounded-xl cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{link.icon}</span>
                          <span className="text-slate-300 font-bold group-hover:text-white transition-colors">{link.title}</span>
                        </div>
                        <span className="text-xs px-2 py-1 bg-slate-900 rounded-md text-slate-400 border border-slate-700">{link.type}</span>
                      </div>
                  ))}
                  {commandPaletteLinks.filter(link => link.title.toLowerCase().includes(cmdSearchQuery.toLowerCase())).length === 0 && (
                     <div className="text-slate-500 text-sm py-8 text-center flex flex-col items-center">
                       <span className="text-3xl mb-2">📡</span>
                       Matrix-Sektor leer. Keine Übereinstimmung für "{cmdSearchQuery}".
                     </div>
                  )}
                </div>
              ) : (
                <div className="space-y-1">
                   <div className="px-3 py-2 text-xs font-black text-slate-500 uppercase tracking-widest">Schnellzugriff</div>
                   {commandPaletteLinks.slice(0, 4).map((link, i) => (
                      <div 
                        key={i}
                        onClick={() => {
                          navigate(link.url);
                          setIsCommandPaletteOpen(false);
                        }}
                        className="flex items-center justify-between p-3 hover:bg-slate-800 border border-transparent hover:border-slate-700/50 rounded-xl cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{link.icon}</span>
                          <span className="text-slate-300 font-bold group-hover:text-white transition-colors">{link.title}</span>
                        </div>
                        <span className="text-xs px-2 py-1 bg-slate-900 rounded-md text-slate-400 border border-slate-700">{link.type}</span>
                      </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

import { LanguageProvider } from "./context/LanguageContext";
export default function App() { return <LanguageProvider><CreditsProvider><AppContent /></CreditsProvider></LanguageProvider>; }