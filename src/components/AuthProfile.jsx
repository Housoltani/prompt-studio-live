import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { toast } from 'react-hot-toast';
import { soundEngine } from '../utils/SoundEngine';
import { useCredits } from '../context/CreditsContext';

export default function AuthProfile() {
  const { credits } = useCredits();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isCybertron, setIsCybertron] = useState(document.body.classList.contains('theme-cybertron'));

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

  const toggleCybertron = () => {
    soundEngine.playClick();
    if (isCybertron) {
      document.body.classList.remove('theme-cybertron');
      setIsCybertron(false);
      toast('Protokoll: Erde. Reaktiviert.', { icon: '🌍', style: { background: '#1e293b', color: '#fff' }});
    } else {
      soundEngine.playTransform();
      document.body.classList.add('theme-cybertron');
      setIsCybertron(true);
      toast.success('Cybertron-Protokoll aktiviert. System-Override...', { 
        icon: '🤖', 
        style: { background: '#050a15', color: '#00e6ff', border: '1px solid #00e6ff', textShadow: '0 0 5px #00e6ff' }
      });
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

  // ------------------------------------------------------------------
  // LOGGED IN VIEW
  // ------------------------------------------------------------------
  if (session) {
    return (
      <div className="max-w-5xl mx-auto mt-4 px-4 pb-12 animate-fade-in">
        <h2 className="text-4xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 tracking-tight">👤 Kommando-Profil</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: User Card */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="glass-card p-8 rounded-[2rem] border border-slate-700/50 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-emerald-400"></div>
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-4 bg-gradient-to-tr from-blue-500 to-emerald-400 rounded-full flex items-center justify-center text-4xl font-bold shadow-[0_0_30px_rgba(59,130,246,0.3)] border-4 border-slate-800 group-hover:scale-105 transition-transform">
                  {session.user.email[0].toUpperCase()}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{session.user.email.split('@')[0]}</h3>
                <p className="text-xs text-slate-400 font-mono mb-6">{session.user.email}</p>
                
                <div className="w-full bg-slate-900/80 rounded-xl p-4 border border-slate-700 mb-6 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sparks</span>
                  <span className="text-lg font-black text-amber-400">⚡ {credits}</span>
                </div>

                <button 
                  onClick={() => { soundEngine.playClick(); handleSignOut(); }}
                  className="w-full bg-slate-800 hover:bg-red-500/20 text-red-400 border border-slate-700 hover:border-red-500/50 px-6 py-3 rounded-xl font-bold transition-all shadow-lg"
                >
                  System verlassen
                </button>
              </div>
            </div>

            {/* Cybertron Protocol Card */}
            <div className={`glass-card p-6 rounded-[2rem] border transition-all relative overflow-hidden group cursor-pointer ${isCybertron ? 'border-cyan-500/50 shadow-[0_0_30px_rgba(0,230,255,0.15)] bg-slate-900' : 'border-slate-700/50 hover:border-slate-500'}`} onClick={toggleCybertron}>
               {isCybertron && <div className="absolute inset-0 bg-cyan-500/5 animate-pulse pointer-events-none"></div>}
               <div className="flex justify-between items-center relative z-10">
                 <div>
                   <h4 className={`text-lg font-black mb-1 transition-colors ${isCybertron ? 'text-cyan-400' : 'text-white group-hover:text-slate-200'}`}>Cybertron-Protokoll</h4>
                   <p className="text-xs text-slate-400">Visueller System-Override.</p>
                 </div>
                 <div className={`w-12 h-6 rounded-full transition-colors relative ${isCybertron ? 'bg-cyan-500 shadow-[0_0_15px_#00e6ff]' : 'bg-slate-700'}`}>
                   <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${isCybertron ? 'translate-x-6' : 'translate-x-0'}`}></div>
                 </div>
               </div>
            </div>
          </div>

          {/* Right Column: Settings & History */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            <div className="glass-panel p-8 rounded-[2.5rem] border border-slate-700/50">
               <div className="flex items-center justify-between mb-8 border-b border-slate-700/50 pb-4">
                 <h4 className="text-xl font-bold text-white flex items-center gap-2"><span className="text-blue-400">💎</span> Mein Inventar</h4>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-5 hover:border-blue-500/50 transition-colors cursor-pointer group">
                   <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block mb-2">Gekauft</span>
                   <h5 className="font-bold text-slate-200 mb-2 group-hover:text-blue-400 transition-colors">Das ultimative SEO-Content Framework</h5>
                   <p className="text-xs text-slate-500">Master-Prompt für ChatGPT</p>
                 </div>
                 <div className="bg-slate-900/30 border border-slate-700/50 rounded-2xl p-5 border-dashed flex flex-col items-center justify-center text-slate-500 min-h-[120px] hover:border-slate-500 transition-colors cursor-pointer">
                   <span className="text-2xl mb-2">🛒</span>
                   <span className="text-sm font-bold">Marktplatz erkunden</span>
                 </div>
               </div>
            </div>

            <div className="glass-panel p-8 rounded-[2.5rem] border border-slate-700/50">
               <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><span className="text-emerald-400">⚙️</span> Account Einstellungen</h4>
               
               <div className="space-y-4">
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                   <div>
                     <div className="font-bold text-slate-200">Abonnement-Status</div>
                     <div className="text-xs text-slate-400 mt-1">Free Tier (Sparks-basiert)</div>
                   </div>
                   <button onClick={() => window.location.href='/app/pricing'} className="mt-3 sm:mt-0 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 font-bold px-4 py-2 rounded-lg text-sm shadow-lg hover:scale-105 transition-transform">
                     Pro Upgrade
                   </button>
                 </div>

                 <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                   <div>
                     <div className="font-bold text-slate-200">Passwort ändern</div>
                     <div className="text-xs text-slate-400 mt-1">Letzte Änderung: Nie</div>
                   </div>
                   <button className="mt-3 sm:mt-0 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 font-bold px-4 py-2 rounded-lg text-sm transition-colors">
                     Aktualisieren
                   </button>
                 </div>
               </div>
            </div>

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