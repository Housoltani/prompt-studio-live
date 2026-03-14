import React, { useState } from 'react';
import { useCredits } from '../context/CreditsContext';
import { soundEngine } from '../utils/SoundEngine';

export default function EarnCredits() {
  const { credits, addCredits } = useCredits();
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const startAd = () => {
    soundEngine.playClick();
    setIsPlaying(true);
    setTimeLeft(15); // 15 seconds ad

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          addCredits(25); // Reward 25 credits
          soundEngine.playSuccess();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="max-w-4xl animate-fade-in mx-auto mt-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">💎 Kredite Sammeln</h2>
          <p className="text-slate-400">Hol dir kostenlose Kredite, um Premium-KI-Modelle zu nutzen.</p>
        </div>
        <div className="glass-card px-6 py-3 rounded-2xl border-amber-500/50 bg-amber-500/10 flex items-center gap-3">
          <span className="text-2xl">🪙</span>
          <div>
            <div className="text-xs text-amber-500 font-bold uppercase tracking-wider">Dein Guthaben</div>
            <div className="text-2xl font-black text-white">{credits}</div>
          </div>
        </div>
      </div>

      {isPlaying ? (
        <div className="glass-panel p-2 rounded-3xl border border-blue-500/50 shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)] relative overflow-hidden bg-black">
          <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-white font-bold font-mono text-sm border border-slate-700">
            Werbung endet in: {timeLeft}s
          </div>
          {/* Simulated Ad Video */}
          <video 
            src="https://cdn.pixabay.com/video/2023/10/22/185966-876722880_large.mp4" 
            autoPlay 
            muted 
            loop 
            className="w-full h-[400px] object-cover rounded-2xl opacity-80"
          ></video>
          <div className="absolute bottom-4 left-0 right-0 px-8 z-20">
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-linear" 
                style={{ width: `${((15 - timeLeft) / 15) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Video Ad Card */}
          <div className="glass-card rounded-3xl p-8 flex flex-col items-center text-center group hover:border-amber-500/50 transition-all">
            <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-[0_0_30px_rgba(245,158,11,0.3)] group-hover:scale-110 transition-transform">
              📺
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Werbevideo ansehen</h3>
            <p className="text-slate-400 text-sm mb-6">Schau dir einen kurzen Clip (15s) an und erhalte sofort Kredite für deinen Account.</p>
            <div className="text-amber-400 font-black text-2xl mb-6">+ 25 Kredite</div>
            <button 
              onClick={startAd}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 rounded-xl transition-colors shadow-lg"
            >
              Video starten
            </button>
          </div>

          {/* Share Card */}
          <div className="glass-card rounded-3xl p-8 flex flex-col items-center text-center opacity-70">
            <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center text-4xl mb-6">
              🤝
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Freunde einladen</h3>
            <p className="text-slate-400 text-sm mb-6">Teile deinen Ref-Link. Wenn sich jemand anmeldet, werdet ihr beide belohnt.</p>
            <div className="text-slate-300 font-black text-2xl mb-6">+ 100 Kredite</div>
            <button className="w-full bg-slate-700 text-slate-400 font-bold py-3 rounded-xl cursor-not-allowed">
              Bald verfügbar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
