import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { toast } from 'react-hot-toast';
import { soundEngine } from '../utils/SoundEngine';
import { useCredits } from '../context/CreditsContext';
import { communityPrompts, marketplacePrompts } from '../data';

export default function AuthProfile() {
  const { credits } = useCredits();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Profile specific states
  const [activeTab, setActiveTab] = useState('showcase'); // showcase, shop, likes
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: 'Prompt Master',
    bio: 'Digital Artist & Prompt Engineer. Spezialisiert auf Midjourney Architektur & Cinematic Portraits. Open for commissions.',
    website: 'https://prompt-studio.live',
    twitter: '@prompt_master',
    avatar: '🤖',
    banner: 'https://picsum.photos/seed/cyber/1200/400'
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    soundEngine.playClick();
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success('Systemzugang angefordert! Bitte E-Mail verifizieren.', { icon: '📧' });
        soundEngine.playSuccess();
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success('Uplink etabliert. Willkommen zurück!', { icon: '🔓' });
        soundEngine.playSuccess();
      }
    } catch (error) {
      toast.error(`Zugriff verweigert: ${error.error_description || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toast.error(error.message);
    else toast.success('Verbindung getrennt.');
  };

  const handleSocialLogin = (provider) => {
    soundEngine.playClick();
    toast('OAuth Provider bald verfügbar.', { icon: '🚧' });
  };

  const handleSaveProfile = () => {
    soundEngine.playSuccess();
    setIsEditing(false);
    toast.success('Creator Profil aktualisiert!');
  };

  // Mock data for the portfolio
  const userShowcase = communityPrompts.slice(0, 3);
  const userProducts = marketplacePrompts.slice(0, 2);

  // ------------------------------------------------------------------
  // LOGGED IN VIEW - CREATOR PORTFOLIO
  // ------------------------------------------------------------------
  if (session) {
    const username = session.user.email.split('@')[0];

    return (
      <div className="max-w-6xl mx-auto mt-4 pb-16 animate-fade-in relative">
        
        {/* Floating Actions */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
           <button 
             onClick={() => setIsEditing(!isEditing)} 
             className="bg-slate-900/80 backdrop-blur-md border border-slate-700 hover:border-blue-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg transition-all"
           >
             {isEditing ? '👀 Vorschau' : '✏️ Profil bearbeiten'}
           </button>
           <button 
             onClick={() => { soundEngine.playClick(); handleSignOut(); }}
             className="bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 text-red-400 px-4 py-2 rounded-xl text-sm font-bold shadow-lg transition-all"
           >
             Logout
           </button>
        </div>

        {/* HEADER / BANNER */}
        <div className="relative w-full h-64 md:h-80 rounded-[2rem] overflow-hidden mb-20 shadow-2xl border border-slate-700/50 group">
          <img src={profileData.banner} alt="Profile Banner" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
          
          {isEditing && (
            <button className="absolute inset-0 m-auto w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/70 transition-colors">
              📷
            </button>
          )}

          {/* Avatar Positioned over the edge */}
          <div className="absolute -bottom-16 left-8 md:left-12 flex items-end gap-6 z-10">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-slate-800 border-4 border-slate-950 shadow-2xl flex items-center justify-center text-6xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800">
                {profileData.avatar}
              </div>
              {isEditing && (
                <button className="absolute bottom-2 right-2 w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-xs border border-slate-600 hover:bg-slate-800">
                  ✏️
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="px-8 md:px-12">
          {/* PROFILE INFO & STATS */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            
            {/* Bio Section */}
            <div className="max-w-xl">
              {isEditing ? (
                <div className="space-y-3 w-full">
                  <input type="text" value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-2xl font-black text-white w-full" />
                  <textarea value={profileData.bio} onChange={e => setProfileData({...profileData, bio: e.target.value})} className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 w-full h-24 resize-none" />
                </div>
              ) : (
                <>
                  <h1 className="text-4xl font-black text-white mb-1">{profileData.name} <span className="text-blue-500 text-2xl">☑</span></h1>
                  <p className="text-slate-500 font-mono text-sm mb-4">@{username}</p>
                  <p className="text-slate-300 text-[15px] leading-relaxed mb-4">{profileData.bio}</p>
                </>
              )}
              
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-1.5 text-xs font-medium bg-slate-900/80 border border-slate-700 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:border-slate-500 cursor-pointer transition-colors">
                  🔗 {profileData.website.replace('https://', '')}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium bg-slate-900/80 border border-slate-700 px-3 py-1.5 rounded-lg text-slate-300 hover:text-blue-400 hover:border-blue-500 cursor-pointer transition-colors">
                  🐦 {profileData.twitter}
                </span>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 min-w-[120px] text-center backdrop-blur-sm">
                <div className="text-2xl font-black text-white mb-1">12.4k</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Follower</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 min-w-[120px] text-center backdrop-blur-sm">
                <div className="text-2xl font-black text-emerald-400 mb-1">340</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Verkäufe</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 min-w-[120px] text-center backdrop-blur-sm">
                <div className="text-2xl font-black text-blue-400 mb-1">2.1k</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Generiert</div>
              </div>
            </div>
          </div>

          {/* BADGES / ACHIEVEMENTS */}
          <div className="mb-12">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              🏆 Creator Abzeichen <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full text-[10px]">4 Freigeschaltet</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 px-4 py-2 rounded-xl">
                <span className="text-xl">🌟</span>
                <span className="text-sm font-bold text-amber-400">Top Seller</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 px-4 py-2 rounded-xl">
                <span className="text-xl">🎨</span>
                <span className="text-sm font-bold text-purple-400">Midjourney Pro</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 px-4 py-2 rounded-xl">
                <span className="text-xl">🚀</span>
                <span className="text-sm font-bold text-blue-400">Early Adopter</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed">
                <span className="text-xl">🎥</span>
                <span className="text-sm font-bold text-slate-400">Video Master (Locked)</span>
              </div>
            </div>
          </div>

          {/* SPARK ALLIANZ MINI BANNER */}
          <div className="mb-12 bg-gradient-to-r from-indigo-900/40 to-purple-900/20 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-2xl text-indigo-300">
                  🤝
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Spark-Allianz Rekrutierung</h4>
                  <p className="text-xs text-indigo-300">Lade Creator ein. Verdiene 1.000 Sparks pro Rekrut. <span className="text-amber-400 font-bold ml-1">+ Passive Einnahmen!</span></p>
                </div>
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('https://prompt-studio.live/join/commander-99X');
                  toast.success('Allianz-Link in die Zwischenablage kopiert!', { icon: '🔗' });
                  soundEngine.playSuccess();
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(79,70,229,0.4)] whitespace-nowrap flex items-center justify-center gap-2"
              >
                Link kopieren
              </button>
            </div>
          </div>

          {isEditing && (
            <div className="mb-12 flex justify-end">
               <button onClick={handleSaveProfile} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-105 transition-transform">
                 Änderungen speichern
               </button>
            </div>
          )}

          {/* PORTFOLIO TABS */}
          <div className="border-b border-slate-800 mb-8">
            <div className="flex gap-8">
              <button 
                onClick={() => setActiveTab('showcase')}
                className={`pb-4 font-bold text-sm transition-colors relative ${activeTab === 'showcase' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                🖼️ Showcase
                {activeTab === 'showcase' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-t-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>}
              </button>
              <button 
                onClick={() => setActiveTab('shop')}
                className={`pb-4 font-bold text-sm transition-colors relative ${activeTab === 'shop' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                🛒 Shop ({userProducts.length})
                {activeTab === 'shop' && <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 rounded-t-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>}
              </button>
              <button 
                onClick={() => setActiveTab('likes')}
                className={`pb-4 font-bold text-sm transition-colors relative ${activeTab === 'likes' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                ❤️ Gefällt mir
                {activeTab === 'likes' && <div className="absolute bottom-0 left-0 w-full h-1 bg-pink-500 rounded-t-full shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>}
              </button>
            </div>
          </div>

          {/* TAB CONTENT */}
          <div className="animate-fade-in">
            {activeTab === 'showcase' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userShowcase.map((item, idx) => (
                  <div key={idx} className="glass-card rounded-2xl overflow-hidden border border-slate-700/50 group">
                    <div className="h-48 bg-slate-800 relative">
                      <img src={`https://picsum.photos/seed/${item.id + 50}/600/400`} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                        ❤️ {item.likes}
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-white mb-1 truncate">{item.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2">{item.prompt}</p>
                    </div>
                  </div>
                ))}
                {isEditing && (
                  <div className="glass-card rounded-2xl border-2 border-dashed border-slate-700 hover:border-blue-500 flex flex-col items-center justify-center h-full min-h-[250px] cursor-pointer group transition-colors">
                    <div className="w-12 h-12 rounded-full bg-slate-800 group-hover:bg-blue-500/20 flex items-center justify-center text-2xl text-slate-500 group-hover:text-blue-400 transition-colors mb-3">
                      +
                    </div>
                    <span className="text-sm font-bold text-slate-400 group-hover:text-blue-400">Werk hinzufügen</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'shop' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userProducts.map((product) => (
                  <div key={product.id} className="glass-card p-5 rounded-2xl border border-slate-700/50 flex gap-4 hover:border-emerald-500/50 transition-colors">
                    <div className="w-24 h-24 rounded-xl bg-slate-800 flex-shrink-0 flex items-center justify-center text-3xl">
                      {product.category === 'Midjourney' ? '🎨' : '🤖'}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-white text-lg">{product.title}</h4>
                        <span className="text-emerald-400 font-black">${product.price}</span>
                      </div>
                      <p className="text-xs text-slate-400 mb-3 line-clamp-2">{product.preview}</p>
                      <div className="flex items-center gap-4 text-xs font-bold">
                        <span className="text-slate-500">🛒 {product.sales} Verkäufe</span>
                        <span className="text-yellow-500">⭐ {product.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'likes' && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">👻</div>
                <h3 className="text-xl font-bold text-white mb-2">Noch keine Favoriten</h3>
                <p className="text-slate-400">Durchsuche den Community Feed und markiere Prompts mit einem Herz.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // LOGGED OUT VIEW (Login/Register)
  // ------------------------------------------------------------------
  return (
    <div className="max-w-md mx-auto mt-12 px-4 animate-fade-in relative z-10">
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[400px] bg-blue-500/20 blur-[100px] -z-10 rounded-full pointer-events-none"></div>

      <div className="glass-card p-8 rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] border border-slate-700/50 backdrop-blur-xl relative overflow-hidden group">
        
        {/* Animated Top Border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent translate-x-[-100%] animate-[scan_3s_ease-in-out_infinite]"></div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(59,130,246,0.5)] mb-6 transform rotate-3 group-hover:rotate-6 transition-transform">
            ⚡
          </div>
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
            {isSignUp ? 'Systemzugang' : 'Willkommen zurück'}
          </h2>
          <p className="text-slate-400 text-sm">
            {isSignUp ? 'Erstelle deine Kommando-ID' : 'Logge dich in das Terminal ein'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">E-Mail Uplink</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">@</span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl pl-10 pr-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
                placeholder="commander@domain.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Sicherheitscode</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔑</span>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl pl-10 pr-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner font-mono tracking-widest"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading || !email || !password}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-4 px-4 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all disabled:opacity-50 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transform hover:-translate-y-0.5 flex justify-center items-center gap-2 mt-2"
          >
            {loading ? (
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              isSignUp ? 'Zugang Anfordern' : 'Uplink Starten'
            )}
          </button>
        </form>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700/50"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[#0f172a] px-4 text-slate-500 uppercase tracking-widest font-bold">Oder</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button onClick={() => handleSocialLogin('Google')} className="bg-slate-900/50 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
            G Google
          </button>
          <button onClick={() => handleSocialLogin('GitHub')} className="bg-slate-900/50 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
            ⌘ GitHub
          </button>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => { soundEngine.playClick(); setIsSignUp(!isSignUp); }}
            className="text-sm font-bold text-slate-400 hover:text-blue-400 transition-colors"
          >
            {isSignUp ? 'Bereits registriert? Hier einloggen.' : 'Keine Kommando-ID? Jetzt erstellen.'}
          </button>
        </div>
      </div>
    </div>
  );
}
