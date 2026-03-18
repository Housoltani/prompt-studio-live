import React, { useState, useEffect } from 'react';
import { useCredits } from '../context/CreditsContext';
import { soundEngine } from '../utils/SoundEngine';
import { toast } from 'react-hot-toast';

export default function EarnCredits() {
  const { credits, addCredits } = useCredits();
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  
  const [dailyAvailable, setDailyAvailable] = useState(false);
  const [dailyVideoSparks, setDailyVideoSparks] = useState(0); // Max 160 per day
  const maxDailyVideoSparks = 160;
  
  // Daily Streak
  const [streakDays, setStreakDays] = useState(1);
  const [streakClaimed, setStreakClaimed] = useState(false);

  // Load limits and streak on mount
  useEffect(() => {
    const todayStr = new Date().toDateString();
    
    // Video Sparks Limit logic
    const savedVideoLimit = localStorage.getItem('ps_video_limit_date');
    if (savedVideoLimit === todayStr) {
      setDailyVideoSparks(parseInt(localStorage.getItem('ps_video_sparks_earned') || '0'));
    } else {
      localStorage.setItem('ps_video_limit_date', todayStr);
      localStorage.setItem('ps_video_sparks_earned', '0');
      setDailyVideoSparks(0);
    }

    // Daily Claim logic & Streak
    const lastClaimStr = localStorage.getItem('ps_last_claim_date');
    const savedStreak = parseInt(localStorage.getItem('ps_streak') || '1');
    
    if (!lastClaimStr) {
      setDailyAvailable(true);
      setStreakDays(1);
    } else {
      const lastClaimDate = new Date(lastClaimStr);
      const today = new Date();
      
      // Reset at midnight
      if (lastClaimDate.getDate() !== today.getDate() || lastClaimDate.getMonth() !== today.getMonth()) {
        setDailyAvailable(true);
        setStreakClaimed(false);
        
        // Check if it was exactly yesterday to keep streak
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastClaimDate.getDate() === yesterday.getDate() && lastClaimDate.getMonth() === yesterday.getMonth()) {
          setStreakDays(savedStreak < 7 ? savedStreak + 1 : 7); // Max streak 7
        } else {
          setStreakDays(1); // Streak broken
        }
      } else {
        setDailyAvailable(false);
        setStreakClaimed(true);
        setStreakDays(savedStreak);
      }
    }
  }, []);

  const claimDaily = () => {
    if (!dailyAvailable) return;
    soundEngine.playSuccess();
    
    const reward = 10 + (streakDays * 5); // Base 10 + 5 per streak day
    addCredits(reward);
    
    localStorage.setItem('ps_last_claim_date', new Date().toISOString());
    localStorage.setItem('ps_streak', streakDays.toString());
    
    setDailyAvailable(false);
    setStreakClaimed(true);
    toast.success(`${reward} Sparks gesichert! (Tag ${streakDays} Streak 🔥)`, { 
      style: { background: '#064e3b', color: '#34d399', border: '1px solid #10b981' } 
    });
  };

  const startAd = () => {
    if (dailyVideoSparks >= maxDailyVideoSparks) {
      toast.error(`Tägliches Sponsor-Limit erreicht (${maxDailyVideoSparks} Sparks).`, { icon: '🛑' });
      soundEngine.playError();
      return;
    }
    
    const reward = 20; // 20 Sparks per video
    if (dailyVideoSparks + reward > maxDailyVideoSparks) {
      toast.error(`Nur noch ${maxDailyVideoSparks - dailyVideoSparks} Sparks heute verfügbar.`, { icon: '⚠️' });
      return;
    }

    soundEngine.playClick();
    setIsPlaying(true);
    setTimeLeft(30); // 30 seconds ad

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          
          addCredits(reward);
          const newTotal = dailyVideoSparks + reward;
          setDailyVideoSparks(newTotal);
          localStorage.setItem('ps_video_sparks_earned', newTotal.toString());
          
          soundEngine.playSuccess();
          toast.success(`+${reward} Sparks! (${newTotal}/${maxDailyVideoSparks} heute)`, {
            style: { background: '#1e3a8a', color: '#60a5fa', border: '1px solid #3b82f6' }
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="max-w-6xl animate-fade-in mx-auto mt-4 p-4 pb-20">
      
      {/* HERO HEADER */}
      <div className="glass-panel p-8 rounded-3xl relative overflow-hidden border border-slate-700/50 mb-10 bg-slate-900/80 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4"></div>
        <div className="relative z-10 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight flex items-center gap-3">
            Sparks <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Generator</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Basis-Modelle sind für alle Agenten frei. Für Premium-Generatoren (Bilder, Video) benötigst du <strong className="text-amber-400">Sparks</strong>. Lade deine Batterie hier auf.
          </p>
        </div>
        
        {/* BIG BATTERY DISPLAY */}
        <div className="relative z-10 flex-shrink-0 bg-slate-950/80 p-6 rounded-3xl border border-slate-700/80 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] min-w-[280px]">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-slate-400 font-black uppercase tracking-widest">Energie-Level</span>
            <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">Stable</span>
          </div>
          <div className="flex items-end gap-3 mb-2">
            <span className="text-6xl font-black text-white drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">{credits}</span>
            <span className="text-xl text-amber-500 font-bold mb-1.5 flex items-center gap-1">⚡ Sparks</span>
          </div>
          {/* Progress Bar Mock */}
          <div className="w-full bg-slate-800 rounded-full h-2 mt-4 overflow-hidden border border-slate-700">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full w-[85%] shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
          </div>
        </div>
      </div>

      {isPlaying ? (
        <div className="glass-panel p-2 rounded-3xl border border-blue-500/50 shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)] relative overflow-hidden bg-black animate-pulse max-w-4xl mx-auto">
          <div className="absolute top-4 right-4 z-20 bg-black/80 backdrop-blur px-4 py-2 rounded-full text-white font-bold font-mono text-sm border border-slate-700 flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            Uplink endet in: <span className="text-red-400 text-lg">{timeLeft}s</span>
          </div>
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md text-center">
             <h2 className="text-4xl font-black text-white mb-4 tracking-widest uppercase border-b border-blue-500/50 pb-4">Sponsoren-Übertragung</h2>
             <p className="text-blue-400 font-mono text-xl animate-pulse">Bitte warten, Energie wird in deine Matrix transferiert...</p>
             <p className="text-slate-500 font-mono text-sm mt-8 opacity-50">Datenpakete werden dekomprimiert ({(30-timeLeft)*100} / 3000 MB)</p>
          </div>
          {/* Simulated Ad Video */}
          <video 
            src="https://cdn.pixabay.com/video/2023/10/22/185966-876722880_large.mp4" 
            autoPlay 
            muted 
            loop 
            className="w-full h-[500px] object-cover rounded-2xl opacity-40 blur-sm"
          ></video>
          <div className="absolute bottom-6 left-0 right-0 px-12 z-20">
            <div className="w-full bg-slate-800/80 backdrop-blur-sm rounded-full h-3 border border-slate-700">
              <div 
                className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full transition-all duration-1000 ease-linear shadow-[0_0_15px_#3b82f6]" 
                style={{ width: `${((30 - timeLeft) / 30) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* ACHIEVEMENTS / STREAKS UI */}
          <div className="col-span-1 md:col-span-3 mb-2 mt-4">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-bold text-white">📡 Transmissionen & Quests</h3>
              <div className="h-px bg-slate-700/50 flex-1 ml-4"></div>
            </div>
          </div>

          {/* Daily Streak Card */}
          <div className={`glass-card rounded-3xl p-8 flex flex-col items-center text-center transition-all relative overflow-hidden border ${dailyAvailable ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] bg-emerald-900/10' : 'border-slate-700/50 bg-slate-800/40 opacity-80'}`}>
            {streakDays > 1 && (
              <div className="absolute top-0 left-0 w-full bg-emerald-500 text-slate-900 text-[10px] font-black uppercase py-1 shadow-lg tracking-widest">
                🔥 Tag {streakDays} Streak aktiv (+{streakDays * 5} Bonus)
              </div>
            )}
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6 mt-4 ${dailyAvailable ? 'bg-gradient-to-tr from-emerald-400 to-teal-600 shadow-[0_0_20px_rgba(52,211,153,0.4)]' : 'bg-slate-700 grayscale'}`}>
              🎁
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Tägliche Ration</h3>
            <p className="text-slate-400 text-sm mb-6 flex-1">Logge dich täglich ein, um deine Streak zu erhöhen. Mehr Tage = Mehr Sparks.</p>
            <div className={`font-black text-2xl mb-6 ${dailyAvailable ? 'text-emerald-400' : 'text-slate-500'}`}>
              + {10 + (dailyAvailable ? (streakDays * 5) : ((streakDays - 1) * 5))} Sparks
            </div>
            <button 
              onClick={claimDaily}
              disabled={!dailyAvailable}
              className={`w-full font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${dailyAvailable ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-900' : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'}`}
            >
              {dailyAvailable ? 'Sparks extrahieren' : 'Transmission beendet'}
            </button>
          </div>

          {/* Video Ad Card */}
          <div className="glass-card rounded-3xl p-8 flex flex-col items-center text-center group hover:border-blue-500/50 transition-all border border-blue-500/20 relative overflow-hidden bg-blue-900/10 shadow-[0_0_30px_rgba(59,130,246,0.05)]">
            {/* Daily Limit Tracker */}
            <div className="absolute top-0 left-0 w-full bg-slate-900/80 backdrop-blur border-b border-blue-500/30 flex h-1.5">
              <div className="h-full bg-blue-500 transition-all shadow-[0_0_10px_#3b82f6]" style={{ width: `${(dailyVideoSparks / maxDailyVideoSparks) * 100}%` }}></div>
            </div>
            <div className="absolute top-4 left-4 text-[10px] font-black text-blue-400 tracking-widest bg-blue-900/30 px-2 py-0.5 rounded border border-blue-500/30">
              {dailyVideoSparks} / {maxDailyVideoSparks} HEUTE
            </div>
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black px-3 py-1.5 rounded-bl-xl shadow-lg tracking-wider">HIGH YIELD</div>
            
            <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-4xl mb-6 mt-6 shadow-[0_0_30px_rgba(59,130,246,0.4)] group-hover:scale-110 transition-transform">
              📺
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sponsoren-Uplink</h3>
            <p className="text-slate-400 text-sm mb-6 flex-1">Empfange eine sichere <strong className="text-blue-400 font-bold">30-sekündige</strong> Datenübertragung der Konzerne.</p>
            <div className="text-blue-400 font-black text-2xl mb-6">+ 20 Sparks</div>
            <button 
              onClick={startAd}
              disabled={dailyVideoSparks >= maxDailyVideoSparks}
              className={`w-full font-bold py-3 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 ${dailyVideoSparks >= maxDailyVideoSparks ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'}`}
            >
              {dailyVideoSparks >= maxDailyVideoSparks ? 'Limit erreicht' : 'Uplink starten'}
            </button>
          </div>

          {/* Premium Upgrade Card */}
          <div className="glass-card rounded-3xl p-8 flex flex-col items-center text-center group hover:border-amber-500/80 transition-all border border-amber-500/30 bg-gradient-to-b from-amber-900/20 to-transparent relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full z-10 shadow-[0_0_15px_rgba(245,158,11,0.6)]">Pro Status</div>
            <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-orange-600 rounded-full flex items-center justify-center text-4xl mb-6 mt-4 shadow-[0_0_30px_rgba(245,158,11,0.4)] group-hover:scale-110 transition-transform">
              🚀
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Matrix Overdrive</h3>
            <p className="text-slate-400 text-sm mb-6 flex-1">Bypass der Sponsoren. Unendliche visuelle Sparks. Priority-Access zu GPT-4 & Midjourney v6.</p>
            <div className="text-amber-400 font-black text-2xl mb-6">∞ Unendlich</div>
            <button 
              onClick={() => window.location.href = '#/app/pricing'}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-black py-3 rounded-xl transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
            >
              System Upgrade
            </button>
          </div>

        </div>

        {/* --- SPARK-ALLIANZ (REFERRAL SYSTEM) --- */}
        <div className="mt-8 mb-4">
          <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-slate-900 border border-indigo-500/30 shadow-[0_0_40px_rgba(79,70,229,0.15)] group hover:border-indigo-400/50 transition-all">
            
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              
              {/* Icon / Graphics */}
              <div className="flex-shrink-0 relative">
                <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-6xl shadow-[0_0_30px_rgba(79,70,229,0.5)] transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                  🤝
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-amber-400 rounded-full border-4 border-slate-900 flex items-center justify-center text-xl font-black text-slate-900 shadow-xl animate-bounce">
                  ⚡
                </div>
              </div>

              {/* Text & Action */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 border border-indigo-500/30">
                  Spark-Allianz Protokoll
                </div>
                <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Rekrutiere Verbündete.</h2>
                <p className="text-slate-400 mb-6 text-sm leading-relaxed max-w-xl">
                  Das Netzwerk muss wachsen. Lade einen neuen Commander über deinen persönlichen Allianz-Link ein. Sobald er andockt, erhaltet ihr <span className="text-amber-400 font-bold">BEIDE sofort 1.000 Sparks</span>. Wenn er das Overdrive-Upgrade aktiviert, fließen monatlich passive Sparks in deine Reaktoren!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔗</span>
                    <input 
                      type="text" 
                      readOnly 
                      value="https://prompt-studio.live/join/commander-99X" 
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-12 pr-4 py-3.5 text-sm font-mono text-indigo-300 focus:outline-none focus:border-indigo-500 shadow-inner"
                    />
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText('https://prompt-studio.live/join/commander-99X');
                      toast.success('Allianz-Link in die Zwischenablage kopiert!', { icon: '🔗' });
                      soundEngine.playSuccess();
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-black py-3 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    Link Kopieren
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
        </>
      )}
    </div>
  );
}
