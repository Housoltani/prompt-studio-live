import React, { useState, useEffect } from 'react';
import { useCredits } from '../context/CreditsContext';
import { soundEngine } from '../utils/SoundEngine';
import { toast } from 'react-hot-toast';

export default function EarnCredits() {
  const { credits, addCredits } = useCredits();
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [dailyAvailable, setDailyAvailable] = useState(false);

  // Check Daily Login Bonus on mount
  useEffect(() => {
    const lastClaim = localStorage.getItem('ps_daily_sparks');
    if (!lastClaim) {
      setDailyAvailable(true);
    } else {
      const lastClaimDate = new Date(parseInt(lastClaim));
      const today = new Date();
      if (lastClaimDate.getDate() !== today.getDate() || lastClaimDate.getMonth() !== today.getMonth()) {
        setDailyAvailable(true);
      }
    }
  }, []);

  const claimDaily = () => {
    if (!dailyAvailable) return;
    soundEngine.playSuccess();
    addCredits(10);
    localStorage.setItem('ps_daily_sparks', Date.now().toString());
    setDailyAvailable(false);
    toast.success('Tägliche Sparks erfolgreich geladen!', { icon: '🎁' });
  };

  const startAd = () => {
    soundEngine.playClick();
    setIsPlaying(true);
    setTimeLeft(15); // 15 seconds ad

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          addCredits(15); // Reward 15 sparks
          soundEngine.playSuccess();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="max-w-5xl animate-fade-in mx-auto mt-4 p-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600 tracking-tight">⚡ Aufladestation</h2>
          <p className="text-slate-400 text-lg">Basis-Modelle sind kostenlos. Sammle Sparks, um Premium-KI (Bilder, Videos) zu befeuern.</p>
        </div>
        <div className="glass-card px-8 py-4 rounded-3xl border-amber-500/50 bg-amber-500/10 flex items-center gap-4 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
          <span className="text-4xl drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]">⚡</span>
          <div>
            <div className="text-xs text-amber-500 font-bold uppercase tracking-widest">Sparks Batterie</div>
            <div className="text-4xl font-black text-white">{credits} <span className="text-xl text-slate-500 font-normal">/ 100</span></div>
          </div>
        </div>
      </div>

      {isPlaying ? (
        <div className="glass-panel p-2 rounded-3xl border border-blue-500/50 shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)] relative overflow-hidden bg-black animate-pulse">
          <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-white font-bold font-mono text-sm border border-slate-700 flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            Uplink endet in: {timeLeft}s
          </div>
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm text-center">
             <h2 className="text-3xl font-black text-white mb-2 tracking-widest">Sponsoren-Übertragung</h2>
             <p className="text-blue-300 font-mono">Bitte warten, Energie wird transferiert...</p>
          </div>
          {/* Simulated Ad Video */}
          <video 
            src="https://cdn.pixabay.com/video/2023/10/22/185966-876722880_large.mp4" 
            autoPlay 
            muted 
            loop 
            className="w-full h-[400px] object-cover rounded-2xl opacity-40 blur-sm"
          ></video>
          <div className="absolute bottom-4 left-0 right-0 px-8 z-20">
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-linear shadow-[0_0_10px_#3b82f6]" 
                style={{ width: `${((15 - timeLeft) / 15) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Daily Bonus Card */}
          <div className={`glass-card rounded-3xl p-8 flex flex-col items-center text-center transition-all relative overflow-hidden ${dailyAvailable ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:border-emerald-400' : 'opacity-60 grayscale'}`}>
            <div className="w-20 h-20 bg-gradient-to-tr from-emerald-400 to-teal-600 rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg">
              🎁
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Tägliche Wartung</h3>
            <p className="text-slate-400 text-sm mb-6">Deine tägliche Ration an Sparks, frisch aus dem Generator-Kern.</p>
            <div className="text-emerald-400 font-black text-2xl mb-6">+ 10 Sparks</div>
            <button 
              onClick={claimDaily}
              disabled={!dailyAvailable}
              className={`w-full font-bold py-3 rounded-xl transition-all shadow-lg ${dailyAvailable ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-900' : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}
            >
              {dailyAvailable ? 'Sparks einsammeln' : 'Morgen wieder da'}
            </button>
          </div>

          {/* Video Ad Card */}
          <div className="glass-card rounded-3xl p-8 flex flex-col items-center text-center group hover:border-blue-500/50 transition-all border border-blue-500/20 relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.1)]">
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl z-10">Beliebt</div>
            <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-4xl mb-6 shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform">
              📺
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Neuronale Sponsoren</h3>
            <p className="text-slate-400 text-sm mb-6">Empfange eine 15-sekündige Übertragung und lade deine Batterie auf.</p>
            <div className="text-blue-400 font-black text-2xl mb-6">+ 15 Sparks</div>
            <button 
              onClick={startAd}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/20"
            >
              Übertragung starten
            </button>
          </div>

          {/* Premium Upgrade Card */}
          <div className="glass-card rounded-3xl p-8 flex flex-col items-center text-center group hover:border-amber-500/80 transition-all border border-amber-500/30 bg-gradient-to-b from-amber-500/5 to-transparent relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-slate-900 text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full z-10 shadow-[0_0_15px_rgba(245,158,11,0.5)]">Pro Tier</div>
            <div className="w-20 h-20 bg-gradient-to-tr from-amber-300 to-orange-600 rounded-full flex items-center justify-center text-4xl mb-6 shadow-[0_0_30px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-transform">
              🚀
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Overdrive Modus</h3>
            <p className="text-slate-400 text-sm mb-6">Keine Wartezeiten. Unendliche visuelle Sparks. Werde ein Premium-Pilot.</p>
            <div className="text-amber-400 font-black text-2xl mb-6">Unendlich ⚡</div>
            <button 
              onClick={() => window.location.href = '/app/pricing'}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 rounded-xl transition-colors shadow-lg shadow-amber-500/30"
            >
              Pro Upgrade
            </button>
          </div>

        </div>
      )}
    </div>
  );
}