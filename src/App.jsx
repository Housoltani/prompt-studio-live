import { LanguageProvider } from "./context/LanguageContext";
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
import InteractivePrompt from './components/prompts/InteractivePrompt'
const PromptMixer = lazy(() => import('./components/prompts/PromptMixer'))
const AssetLab = lazy(() => import('./components/studio/AssetLab'))
const LiveGenerator = lazy(() => import('./components/studio/LiveGenerator'))
const PromptExtractor = lazy(() => import('./components/prompts/PromptExtractor'))
const VideoGenerator = lazy(() => import('./components/studio/VideoGenerator'))
const PromptAnalyzer = lazy(() => import('./components/prompts/PromptAnalyzer'))
const ModelCompare = lazy(() => import('./components/prompts/ModelCompare'))
const MusicGenerator = lazy(() => import('./components/studio/MusicGenerator'))
const CommunityFeed = lazy(() => import('./components/community/CommunityFeed'))
const AgentsHub = lazy(() => import('./components/agents/AgentsHub'))
const FlowBuilder = lazy(() => import('./components/prompts/FlowBuilder'))
const EbookStudio = lazy(() => import('./components/studio/EbookStudio'))
const AuthProfile = lazy(() => import('./components/system/AuthProfile'))
const NotebookLM = lazy(() => import('./components/prompts/NotebookLM'))
const CommandDashboard = lazy(() => import('./components/system/CommandDashboard'))
const Pricing = lazy(() => import('./components/business/Pricing'))
const AIAcademy = lazy(() => import('./components/agents/AIAcademy'))
const Studio = lazy(() => import('./components/studio/Studio'))
const Marketplace = lazy(() => import('./components/business/Marketplace'))
const VisualLibrary = lazy(() => import('./components/community/VisualLibrary'))
const GlobalChat = lazy(() => import('./components/community/GlobalChat'));
const Feedback = lazy(() => import('./components/system/Feedback'));
const MotionLibrary = lazy(() => import('./components/community/MotionLibrary'))
const SonicLibrary = lazy(() => import('./components/community/SonicLibrary'))
const PromptArena = lazy(() => import('./components/prompts/PromptArena'))
const ApiNexus = lazy(() => import('./components/system/ApiNexus'))
const VoiceAvatarStudio = lazy(() => import('./components/studio/VoiceAvatarStudio'))
const DevArchitect = lazy(() => import('./components/agents/DevArchitect'))
const PromptVersioning = lazy(() => import('./components/prompts/PromptVersioning'))
const AIStoryboard = lazy(() => import('./components/studio/AIStoryboard'))
const AIAgencyBlueprint = lazy(() => import('./components/business/AIAgencyBlueprint'))
const PromptMarketplace = lazy(() => import('./components/business/PromptMarketplace'))
const AffiliateSystem = lazy(() => import('./components/business/AffiliateSystem'))
const SocialMediaEngine = lazy(() => import('./components/community/SocialMediaEngine'));
const AgentSimulation = lazy(() => import('./components/agents/AgentSimulation'));
const CinemaStudioPro = lazy(() => import('./components/studio/CinemaStudioPro'));


import { useLanguage } from "./context/LanguageContext";
function AppContent() {
  const { lang, setLang, t } = useLanguage();
  
  const { credits } = useCredits()

  const [user, setUser] = useState(null)
  const [prompts, setPrompts] = useState([]);
  const [isLoadingPrompts, setIsLoadingPrompts] = useState(false);

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
    { title: 'Workflow: Visual Flow Builder', url: '/app/flows', icon: '💠', type: 'Tool' },
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
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nexusTheme') || 'system';
    }
    return 'system';
  });
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
    // Theme Watcher
    localStorage.setItem('nexusTheme', theme);
    const root = document.documentElement;
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = theme === 'dark' || (theme === 'system' && isSystemDark);
    
    if (!isDark) {
      root.classList.add('light-mode-active');
      document.body.classList.add('light-mode-active');
    } else {
      root.classList.remove('light-mode-active');
      document.body.classList.remove('light-mode-active');
    }

    // System theme change listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (theme === 'system') {
        if (!e.matches) {
          root.classList.add('light-mode-active');
          document.body.classList.add('light-mode-active');
        } else {
          root.classList.remove('light-mode-active');
          document.body.classList.remove('light-mode-active');
        }
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

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
          console.warn('Supabase Prompts Warnung (Ignoriert):', error.message)
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
        console.warn('Unerwarteter Fehler beim Abrufen der Prompts (Ignoriert)')
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
    const text = encodeURIComponent(`Schau dir diesen Prompt an: ${title} auf Nexus Studio!`);
    
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
      

      {/* --- MOBILE OVERLAY --- */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#020617]/95 backdrop-blur-xl border-b border-slate-800/60 z-20 flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <picture>
            <source srcSet="/logo.svg" media="(prefers-color-scheme: dark)" />
            <img src="/logo-light.svg" alt="Houcem Studio" className="h-8 w-auto" />
          </picture>
        </div>

        <div className="flex items-center gap-2">
          {/* Credits pill */}
          <NavLink to="/app/pricing" className="flex items-center gap-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-2.5 py-1 rounded-full text-xs font-bold">
            <span>💠</span> {credits}
          </NavLink>
          {/* Lang */}
          <button
            onClick={() => { if (lang === 'de') setLang('en'); else if (lang === 'en') setLang('ar'); else setLang('de'); }}
            className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/50 text-xs font-bold text-slate-400 flex items-center justify-center">
            {lang.toUpperCase()}
          </button>
          {/* Hamburger for full sidebar */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      
      {/* Sidebar Navigation */}
      <div className={`w-72 bg-[#020617]/98 backdrop-blur-3xl border-r border-white/5 p-5 flex flex-col fixed h-full overflow-y-auto z-40 shadow-[4px_0_40px_-10px_rgba(6,182,212,0.15)] transition-transform duration-300 ease-in-out ${lang === 'ar' ? 'border-l right-0' : 'border-r left-0'} ${isMobileMenuOpen ? 'translate-x-0' : (lang === 'ar' ? 'translate-x-full md:translate-x-0' : '-translate-x-full md:translate-x-0')}`}>

        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        {/* Logo */}
        <div className="relative z-10 mb-5">
          <div className="flex items-center gap-2 mb-1">
            <img src="/logo.svg" alt="Houcem Studio" className="h-10 w-auto" />
            <div className="w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#020617] animate-pulse flex-shrink-0" />
          </div>
          <div className="h-px bg-gradient-to-r from-cyan-500/50 via-blue-500/30 to-transparent mt-3" />
        </div>

        {/* Overdrive Badge */}
        <div className="mb-5 relative group cursor-pointer w-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
          <div className="relative p-3 bg-gradient-to-br from-cyan-950/80 to-blue-950/80 border border-cyan-500/20 group-hover:border-cyan-500/40 rounded-2xl flex flex-col gap-2 shadow-xl transition-all">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 flex items-center justify-center text-lg border border-cyan-500/30 flex-shrink-0">
                ⚡
                <div className="absolute inset-0 rounded-xl bg-cyan-400/10 animate-ping opacity-50" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 truncate">Nexus Overdrive</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"></span>
                  <p className="text-[10px] text-emerald-400 font-bold">Aktiv</p>
                </div>
              </div>
            </div>
            <div className="w-full bg-slate-800/80 rounded-full h-1 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1 rounded-full w-[85%] relative">
                <div className="absolute right-0 top-0 h-full w-4 bg-white/40 animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full" />
              </div>
            </div>
            <p className="text-[9px] text-slate-500 text-right">6 Tage verbleibend</p>
          </div>
        </div>

        {/* HOME Button — ganz oben */}
        <NavLink to="/app/home"
          onClick={() => setIsMobileMenuOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 w-full px-3 py-2.5 rounded-xl font-bold text-sm transition-all mb-4 ${
              isActive
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                : 'bg-slate-800/40 border border-slate-700/40 text-slate-400 hover:text-white hover:bg-slate-800/70 hover:border-slate-600/50'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-base transition-all ${isActive ? 'bg-cyan-500/20' : 'bg-slate-800'}`}>
                🏠
              </div>
              <span>Home</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
            </>
          )}
        </NavLink>

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
                      `w-full ${lang === 'ar' ? 'text-right' : 'text-left'} p-2.5 rounded-xl transition-all flex items-center justify-between group relative overflow-hidden ${isActive ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/10 border border-purple-500/40 text-purple-300 font-bold shadow-[0_0_12px_rgba(147,51,234,0.15)]' : 'text-slate-500 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent hover:border-slate-700/40'}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-purple-400 rounded-full shadow-[0_0_8px_rgba(147,51,234,0.8)]" />}
                        <span className="font-semibold text-sm pl-1 flex-1 truncate">
                          {t.tabs[tab.id] || tab.name}
                        </span>
                        {isActive && <span className="text-purple-400 text-xs opacity-60">→</span>}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
          )}
        </nav>

        {/* Sidebar Bottom */}
        <div className="mt-4 pt-4 border-t border-slate-800/60 space-y-1">
          {/* 💰 Geld verdienen */}
          <NavLink to="/app/affiliate" onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) => `flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-bold transition-all border ${isActive ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'border-transparent text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10'}`}>
            {({ isActive }) => (<>
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-sm flex-shrink-0">💰</div>
              <span>Geld verdienen</span>
            </>)}
          </NavLink>

          {/* 🛒 Marktplatz */}
          <NavLink to="/app/marketplace" onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) => `flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-bold transition-all border ${isActive ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'border-transparent text-slate-500 hover:text-purple-400 hover:bg-purple-500/10'}`}>
            {({ isActive }) => (<>
              <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center text-sm flex-shrink-0">🛒</div>
              <span>Marktplatz</span>
            </>)}
          </NavLink>

          <a href="/"
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-500 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-slate-700/40 transition-all group">
            <div className="w-7 h-7 rounded-lg bg-slate-800/80 group-hover:bg-gradient-to-br group-hover:from-cyan-500/20 group-hover:to-blue-500/20 flex items-center justify-center transition-all border border-slate-700/50">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-sm font-semibold">
              {lang === 'ar' ? 'الصفحة الرئيسية' : lang === 'en' ? 'Homepage' : 'Zur Hauptseite'}
            </span>
          </a>
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-[10px] text-slate-700 font-mono">Nexus v2.0</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-emerald-700 font-bold">Online</span>
            </div>
          </div>
        </div>

      </div>

      <div className={`flex-1 p-4 md:p-8 pt-16 md:pt-8 pb-28 md:pb-8 transition-all duration-300 ${lang === 'ar' ? 'md:mr-72' : 'md:ml-72'}`}>

        {/* HEADER */}
        <div className="max-w-7xl mx-auto flex items-center justify-between mb-8 md:sticky md:top-0 bg-[#020617]/80 backdrop-blur-xl z-10 py-3 px-4 rounded-2xl border border-slate-800/60 md:mt-4 gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={lang === 'ar' ? 'بحث...' : lang === 'en' ? 'Search...' : 'Suchen...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-sm text-slate-300 focus:outline-none focus:border-slate-600 transition-all placeholder:text-slate-600"
            />
          </div>
          <div className="flex items-center gap-2">
             {/* Language */}
             <button
               onClick={() => { if (lang === 'de') setLang('en'); else if (lang === 'en') setLang('ar'); else setLang('de'); }}
               className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-600 text-xs font-bold text-slate-400 hover:text-white transition-all"
             >
               <span>🌐</span> {lang.toUpperCase()}
             </button>

             
             {/* Credits */}
             <NavLink to="/app/pricing" className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 text-cyan-400 px-3 py-1.5 rounded-xl text-sm font-bold transition-all">
               <span className="text-xs">💠</span> {credits}
             </NavLink>

             {/* Donate */}
             <button
               onClick={() => {
                 fetch('/api/stripe-checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify({ planId: 'donation', planName: 'Support Nexus Studio', priceEur: 3 }) })
                 .then(r => r.json()).then(d => { if (d.url) window.location.href = d.url; }).catch(() => {});
               }}
               className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold transition-all bg-amber-500/10 border border-amber-500/20 hover:border-amber-400/50 text-amber-400 hover:text-amber-300"
             >
               <span className="absolute inset-0 rounded-xl border border-amber-400/30 animate-ping opacity-20 pointer-events-none" />
               <span>☕</span>
             </button>

             {user ? (
                <div className="flex items-center gap-3 bg-slate-800/50 pl-3 pr-1 py-1 rounded-full border border-slate-700">
                  <span className="text-sm font-bold text-slate-300 ml-2">{user.email.split('@')[0]}</span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 flex items-center justify-center text-xs font-bold shadow-md">
                    {user.email[0].toUpperCase()}
                  </div>
                </div>
             ) : (
                <NavLink to="/app/auth" className="text-sm font-bold bg-purple-600/20 text-purple-400 border border-purple-500/50 px-4 py-2 rounded-xl hover:bg-purple-600/40 transition-colors">
                  Connect
                </NavLink>
             )}
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="home" replace />} />
          <Route path="credits" element={<Navigate to="pricing" replace />} />
          
        
        <Route path="social-engine" element={<Suspense fallback={<LoadingCore />}><SocialMediaEngine /></Suspense>} />
        <Route path="agent-sim" element={<Suspense fallback={<LoadingCore />}><AgentSimulation /></Suspense>} />
                <Route path="cinema-studio" element={<Suspense fallback={<LoadingCore />}><CinemaStudioPro /></Suspense>} />

        
          
        <Route path="notebook" element={<Suspense fallback={<LoadingCore />}><NotebookLM /></Suspense>} />

          
        <Route path="home" element={<Suspense fallback={<LoadingCore />}><CommandDashboard /></Suspense>} />

          {/* --- 1. MEIN STUDIO (MIT SHARE BUTTONS) --- */}
        <Route path="studio" element={<Suspense fallback={<LoadingCore />}><Studio /></Suspense>} />

        {/* --- MARKTPLATZ --- */}
        <Route path="marketplace" element={
          <Suspense fallback={<LoadingCore />}><PromptMarketplace /></Suspense>} />

        {/* --- AFFILIATE SYSTEM --- */}
        <Route path="affiliate" element={
          <Suspense fallback={<LoadingCore />}><AffiliateSystem /></Suspense>} />
        {/* --- KI BILDER BIBLIOTHEK --- */}
        <Route path="images" element={
          <Suspense fallback={<LoadingCore />}><VisualLibrary /></Suspense>
        } />


        {/* --- PROMPT MIXER --- */}
        <Route path="mixer" element={
  <Suspense fallback={<LoadingCore />}><PromptMixer /></Suspense>} />

        {/* --- ASSET LAB --- */}
        <Route path="assetlab" element={
  <Suspense fallback={<LoadingCore />}><AssetLab /></Suspense>} />

        {/* --- LIVE GENERATOR --- */}
        <Route path="generator" element={
  <Suspense fallback={<LoadingCore />}><LiveGenerator /></Suspense>} />

        {/* --- PROMPT EXTRACTOR --- */}
        <Route path="extractor" element={
  <Suspense fallback={<LoadingCore />}><PromptExtractor /></Suspense>} />

        {/* --- VIDEO GENERATOR --- */}
        {/* --- KI VIDEO BIBLIOTHEK --- */}
        <Route path="videos" element={
          <Suspense fallback={<LoadingCore />}><MotionLibrary /></Suspense>
        } />

        {/* --- MODEL COMPARE --- */}
        <Route path="analyzer" element={<Suspense fallback={<LoadingCore />}><PromptAnalyzer /></Suspense>} />
        <Route path="compare" element={
  <Suspense fallback={<LoadingCore />}><ModelCompare /></Suspense>} />

        {/* --- MUSIC GENERATOR --- */}
        {/* --- KI MUSIK BIBLIOTHEK --- */}
        <Route path="music" element={
          <Suspense fallback={<LoadingCore />}><SonicLibrary /></Suspense>
        } />

        {/* --- COMMUNITY FEED --- */}
        <Route path="community" element={
  <Suspense fallback={<LoadingCore />}><CommunityFeed /></Suspense>} />

        <Route path="feedback" element={<Suspense fallback={<LoadingCore />}><Feedback /></Suspense>} />

        {/* --- FLOW BUILDER --- */}
        <Route path="flows" element={
  <Suspense fallback={<LoadingCore />}><FlowBuilder /></Suspense>} />

        
        {/* --- AUTH / PROFILE --- */}
        <Route path="auth" element={
  <Suspense fallback={<LoadingCore />}><AuthProfile /></Suspense>} />

        
        {/* --- AGENTEN HUB --- */}
                
        <Route path="ebook-studio" element={
          <Suspense fallback={<LoadingCore />}><EbookStudio /></Suspense>
        } />
        <Route path="agents" element={
  <Suspense fallback={<LoadingCore />}><AgentsHub /></Suspense>} />

        
        {/* --- EARN CREDITS --- */}
        
        {/* --- PRICING --- */}
        <Route path="pricing" element={<Suspense fallback={<LoadingCore />}><Pricing /></Suspense>} />

        {/* --- KI ACADEMY (LEARNING) --- */}
        <Route path="learning" element={<Suspense fallback={<LoadingCore />}><AIAcademy /></Suspense>} />

        {/* --- PROMPT ARENA --- */}
        <Route path="arena" element={<Suspense fallback={<LoadingCore />}><PromptArena /></Suspense>} />

        {/* --- KI TRENDS RADAR --- */}
        
        {/* --- API NEXUS --- */}
        <Route path="api-nexus" element={<Suspense fallback={<LoadingCore />}><ApiNexus /></Suspense>} />

        {/* --- FEEDBACK --- */}
        
        {/* --- OFFERS --- */}
        
        <Route path="voice-avatar" element={<Suspense fallback={<LoadingCore />}><VoiceAvatarStudio /></Suspense>} />

        <Route path="dev-architect" element={<Suspense fallback={<LoadingCore />}><DevArchitect /></Suspense>} />

        <Route path="storyboard" element={<Suspense fallback={<LoadingCore />}><AIStoryboard /></Suspense>} />

                <Route path="agency-blueprint" element={<Suspense fallback={<LoadingCore />}><AIAgencyBlueprint /></Suspense>} />
                
        <Route path="prompt-versioning" element={<Suspense fallback={<LoadingCore />}><PromptVersioning /></Suspense>} />

        {/* --- 404 Page --- */}
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6 animate-fade-in">
            <div className="relative mb-8">
              <div className="text-[120px] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 leading-none select-none">404</div>
              <div className="absolute inset-0 text-[120px] font-black text-purple-500/10 leading-none blur-2xl select-none">404</div>
            </div>
            <div className="text-5xl mb-6">🛸</div>
            <h2 className="text-2xl font-bold text-white mb-3">
              {lang === 'ar' ? 'الصفحة غير موجودة' : lang === 'en' ? 'Page not found' : 'Seite nicht gefunden'}
            </h2>
            <p className="text-slate-400 max-w-md mb-8">
              {lang === 'ar' ? 'هذه الصفحة غير موجودة أو لا تزال قيد الإنشاء.' : lang === 'en' ? 'This page does not exist or is still being built.' : 'Diese Seite existiert noch nicht oder wird gerade gebaut.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/app/home" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all">
                🏠 {lang === 'ar' ? 'لوحة التحكم' : lang === 'en' ? 'Dashboard' : 'Zum Dashboard'}
              </a>
              <a href="/app/pricing" className="px-6 py-3 bg-slate-800 border border-slate-700 text-white font-bold rounded-xl hover:bg-slate-700 transition-all">
                💠 {lang === 'ar' ? 'شحن الرصيد' : lang === 'en' ? 'Top up Credits' : 'Credits aufladen'}
              </a>
            </div>
          </div>
        } />
        </Routes>
        
        {/* Global Chat Widget */}
        <Suspense fallback={null}>
          <GlobalChat />
        </Suspense>

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
                        className="flex items-center justify-between p-3 bg-slate-800/50 hover:bg-purple-600/20 hover:border-purple-500/50 border border-transparent rounded-xl cursor-pointer transition-colors group"
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


      {/* --- MOBILE BOTTOM NAVIGATION (APP STYLE) --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#020617]/98 backdrop-blur-xl border-t border-slate-800/60" style={{paddingBottom: 'env(safe-area-inset-bottom)'}}>
        <div className="flex items-center justify-around px-1 py-2">

          {/* Home */}
          <NavLink to="/app/home" onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) => `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all min-w-[56px] ${isActive ? 'text-cyan-400' : 'text-slate-600'}`}>
            {({ isActive }) => (<>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isActive ? 'bg-cyan-500/20' : ''}`}>
                <svg className="w-5 h-5" fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-[9px] font-bold">Home</span>
            </>)}
          </NavLink>

          {/* Create */}
          <NavLink to="/app/generator" onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) => `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all min-w-[56px] ${isActive ? 'text-purple-400' : 'text-slate-600'}`}>
            {({ isActive }) => (<>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-lg transition-all ${isActive ? 'bg-purple-500/20' : ''}`}>✨</div>
              <span className="text-[9px] font-bold">Create</span>
            </>)}
          </NavLink>

          {/* FAB Center Button */}
          <div className="flex flex-col items-center -mt-4">
            <NavLink to="/app/generator" onClick={() => setIsMobileMenuOpen(false)}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.5)] border-4 border-[#020617] active:scale-95 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </NavLink>
            <span className="text-[9px] font-bold text-cyan-400 mt-1">Neu</span>
          </div>

          {/* Library */}
          <NavLink to="/app/images" onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) => `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all min-w-[56px] ${isActive ? 'text-emerald-400' : 'text-slate-600'}`}>
            {({ isActive }) => (<>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-lg transition-all ${isActive ? 'bg-emerald-500/20' : ''}`}>🖼️</div>
              <span className="text-[9px] font-bold">Library</span>
            </>)}
          </NavLink>

          {/* Profile */}
          <NavLink to="/app/auth" onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) => `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all min-w-[56px] ${isActive ? 'text-blue-400' : 'text-slate-600'}`}>
            {({ isActive }) => (<>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isActive ? 'bg-blue-500/20' : ''}`}>
                {user
                  ? <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center text-xs font-black text-white">{user.email[0].toUpperCase()}</div>
                  : <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                }
              </div>
              <span className="text-[9px] font-bold">{user ? 'Profil' : 'Login'}</span>
            </>)}
          </NavLink>

        </div>
      </nav>

    </div>
  )
}



const LoadingCore = () => (
  <div className="flex flex-col items-center justify-center h-64 w-full">
    <div className="relative flex items-center justify-center w-24 h-24">
      {/* Outer Ring */}
      <div className="absolute inset-0 rounded-full border-4 border-slate-700/50"></div>
      
      {/* Spinning Outer Ring */}
      <div className="absolute inset-0 rounded-full border-4 border-t-cyan-500 border-r-blue-500 border-b-transparent border-l-transparent animate-spin"></div>
      
      {/* Counter-Spinning Inner Ring */}
      <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-transparent border-b-fuchsia-500 border-l-purple-500 animate-[spin_1.5s_linear_reverse_infinite]"></div>
      
      {/* Pulsing Core */}
      <div className="absolute inset-6 rounded-full bg-cyan-400 blur-sm animate-pulse"></div>
      <div className="absolute inset-7 rounded-full bg-white shadow-[0_0_15px_#22d3ee]"></div>
    </div>
    <div className="mt-6 text-sm font-mono text-cyan-400 animate-pulse uppercase tracking-widest">
      Initializing Systems...
    </div>
  </div>
);


function App() { return <LanguageProvider><CreditsProvider><AppContent /></CreditsProvider></LanguageProvider>; }export default App;
