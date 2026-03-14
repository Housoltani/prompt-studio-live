import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { toast } from 'react-hot-toast';
import { soundEngine } from '../utils/SoundEngine';

export default function AuthProfile() {
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
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success('Registrierung erfolgreich! Bitte überprüfe deine E-Mails.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success('Erfolgreich eingeloggt!');
      }
    } catch (error) {
      toast.error(error.error_description || error.message);
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
    else toast.success('Erfolgreich abgemeldet.');
  };

  if (session) {
    return (
      <div className="max-w-4xl mx-auto mt-4 animate-fade-in">
        <h2 className="text-3xl font-bold mb-8">👤 Mein Profil</h2>
        <div className="glass-panel p-8 rounded-3xl">
          <div className="flex items-center gap-6 mb-8 border-b border-slate-700 pb-8">
            <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-emerald-400 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg shadow-blue-500/20">
              {session.user.email[0].toUpperCase()}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{session.user.email}</h3>
              <p className="text-slate-400">Pro Mitgliedschaft (Aktiv)</p>
            </div>
            <button 
              onClick={() => { soundEngine.playClick(); handleSignOut(); }}
              className="ml-auto bg-slate-800 hover:bg-red-500/20 text-red-400 border border-slate-700 hover:border-red-500/50 px-6 py-2.5 rounded-xl font-bold transition-all"
            >
              Abmelden
            </button>
          </div>
          
          
          {/* Cybertron Toggle */}
          <div className="mb-8 p-6 rounded-2xl border border-slate-700/50 bg-slate-900/50 flex justify-between items-center group hover:border-blue-500/50 transition-all">
            <div>
              <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Das Cybertron-Protokoll</h4>
              <p className="text-sm text-slate-400">Verstecktes Easter-Egg für den ultimativen Prime-Look. (Sci-Fi Theme)</p>
            </div>
            <button 
              onClick={toggleCybertron}
              onMouseEnter={() => soundEngine.playHover()}
              className={`relative w-16 h-8 rounded-full transition-colors ${isCybertron ? 'bg-cyan-500 shadow-[0_0_15px_#00e6ff]' : 'bg-slate-700'}`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${isCybertron ? 'translate-x-8' : 'translate-x-0'}`}></div>
            </button>
          </div>

          <h4 className="text-xl font-bold text-white mb-4">Meine Einkäufe (Marktplatz)</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">Gekauft</span>
              <h5 className="font-bold text-slate-200">Das ultimative SEO-Content Framework</h5>
            </div>
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 border-dashed flex items-center justify-center text-slate-500">
              Noch keine weiteren Käufe
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-12 animate-fade-in">
      <div className="glass-panel p-8 rounded-3xl shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] border border-slate-700/50">
        <h2 className="text-3xl font-extrabold text-white mb-2 text-center">
          {isSignUp ? 'Konto erstellen' : 'Willkommen zurück'}
        </h2>
        <p className="text-slate-400 text-center mb-8">
          {isSignUp ? 'Werde Teil des Prompt Studios' : 'Logge dich in dein Prompt Studio ein'}
        </p>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-1">E-Mail Adresse</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="deine@email.de"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-1">Passwort</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50"
          >
            {loading ? 'Lade...' : (isSignUp ? 'Registrieren' : 'Einloggen')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
          >
            {isSignUp ? 'Bereits ein Konto? Hier einloggen.' : 'Noch kein Konto? Jetzt registrieren.'}
          </button>
        </div>
      </div>
    </div>
  );
}
