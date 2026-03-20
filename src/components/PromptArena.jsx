import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { soundEngine } from '../utils/SoundEngine';

export default function PromptArena() {
  
  const [voted, setVoted] = useState(false);
  const [mode, setMode] = useState('vote'); // 'vote' or 'battle'
  const [battleInput, setBattleInput] = useState('');
  const [battleStatus, setBattleStatus] = useState('idle'); // 'idle', 'generating', 'done'
  const [myBattleImg, setMyBattleImg] = useState('');
  const [opponentImg, setOpponentImg] = useState('');
  const [opponentProgress, setOpponentProgress] = useState(0);


  // Mock data for the current battle
  const currentBattle = {
    theme: 'Cyberpunk Samurai',
    engine: 'Midjourney v6',
    prize: '5.000 Sparks',
    timeLeft: '14h 22m',
    entries: [
      { id: 1, creator: '@NeonBlade', avatar: '🥷', img: 'https://picsum.photos/seed/samurai1/600/800', votes: 1420 },
      { id: 2, creator: '@RoninArt', avatar: '⚔️', img: 'https://picsum.photos/seed/samurai2/600/800', votes: 1380 }
    ]
  };

  
  const startLiveBattle = () => {
    if (!battleInput.trim()) {
      toast.error('Schreibe zuerst einen Prompt für dein Bild!', { icon: '⚠️' });
      return;
    }
    soundEngine.playPop();
    setBattleStatus('generating');
    setOpponentProgress(0);
    
    // Simulate opponent generation
    const interval = setInterval(() => {
      setOpponentProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 15;
      });
    }, 500);

    setTimeout(() => {
      setMyBattleImg('https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=800&q=80');
      setOpponentImg('https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80');
      setBattleStatus('done');
      soundEngine.playSuccess();
      toast.success('Battle beendet! Die Community stimmt jetzt ab.', { icon: '🏆' });
    }, 4000);
  };

  const handleVote = (id) => {
    if (voted) return;
    soundEngine.playSuccess();
    setVoted(true);
    toast.success('Stimme erfolgreich abgegeben! +10 Sparks für dich.', { icon: '🗳️' });
  };

  return (
    <div className="max-w-7xl animate-fade-in mx-auto mt-4 px-4 pb-12">
      
      {/* HEADER */}
      <div className="mb-10 text-center">
        <div className="inline-block bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-red-500/30">
          Tägliche Herausforderung
        </div>
        <h2 className="text-5xl font-black mb-4 text-white tracking-tight">
          ⚔️ Prompt Arena
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Tritt gegen die besten Prompt-Engineers an. Stimme ab oder reiche dein eigenes Meisterwerk ein, um den Preispool zu gewinnen.
        </p>
      </div>

      {/* MODE TOGGLE */}
      <div className="flex justify-center gap-4 mb-10">
        <button 
          onClick={() => { setMode('vote'); soundEngine.playPop(); }}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${mode === 'vote' ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          🗳️ Community Voting
        </button>
        <button 
          onClick={() => { setMode('battle'); soundEngine.playPop(); }}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${mode === 'battle' ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          ⚔️ Live Battle starten
        </button>
      </div>


      {/* CURRENT BATTLE INFO */}
      <div className="glass-panel p-6 rounded-[2rem] border border-red-500/30 bg-gradient-to-br from-red-900/20 to-slate-900 shadow-[0_0_30px_rgba(239,68,68,0.1)] mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Thema: <span className="text-red-400">"{currentBattle.theme}"</span></h3>
          <div className="flex gap-4 text-sm font-bold text-slate-400">
            <span className="flex items-center gap-1">🎨 Engine: {currentBattle.engine}</span>
            <span className="flex items-center gap-1">💰 Preispool: <span className="text-amber-400">{currentBattle.prize}</span></span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Verbleibende Zeit</div>
            <div className="text-3xl font-black text-white font-mono">{currentBattle.timeLeft}</div>
          </div>
          <button className="bg-red-600 hover:bg-red-500 text-white font-black px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-transform hover:scale-105 whitespace-nowrap">
            Jetzt teilnehmen
          </button>
        </div>
      </div>

      {/* VOTING ARENA */}
      <h3 className="text-center font-black text-slate-500 uppercase tracking-widest mb-6">Wähle deinen Favoriten</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16 relative">
        
        {/* VS Badge */}
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-900 rounded-full border-4 border-slate-800 items-center justify-center text-xl font-black text-red-500 z-10 shadow-2xl">
          VS
        </div>

        {currentBattle.entries.map((entry, idx) => (
          <div key={entry.id} className="relative group perspective-1000">
            <div className="glass-card rounded-3xl overflow-hidden border-2 border-slate-700/50 hover:border-red-500/50 transition-all duration-500 transform-style-3d group-hover:rotate-y-2 group-hover:rotate-x-2">
              <div className="relative h-[500px]">
                <img src={entry.img} alt="Entry" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                
                {/* Creator Info */}
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-lg">{entry.avatar}</div>
                  <div>
                    <div className="font-bold text-white shadow-black drop-shadow-md">{entry.creator}</div>
                    {voted && <div className="text-xs text-red-400 font-bold">{entry.votes} Stimmen</div>}
                  </div>
                </div>

                {/* Vote Button Overlay */}
                {!voted && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all flex items-center justify-center">
                    <button 
                      onClick={() => handleVote(entry.id)}
                      className="bg-red-600 text-white font-black text-xl px-8 py-4 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.6)] transform scale-90 group-hover:scale-100 transition-all"
                    >
                      Für dieses Werk stimmen
                    </button>
                  </div>
                )}

                {/* Voted State */}
                {voted && (
                  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur border border-slate-700 px-3 py-1.5 rounded-lg text-sm font-bold text-white flex items-center gap-2">
                    <span className="text-red-500">❤️</span> {((entry.votes / 2800) * 100).toFixed(1)}%
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LEADERBOARD PREVIEW */}
      <div className="max-w-4xl mx-auto">
        <h3 className="font-black text-white text-xl mb-6 flex items-center gap-2">
          👑 Hall of Fame <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-md uppercase">Top Creator</span>
        </h3>
        <div className="glass-panel p-2 rounded-2xl border border-slate-700/50">
          {[1, 2, 3].map((rank) => (
            <div key={rank} className="flex items-center justify-between p-4 border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors rounded-xl">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${rank === 1 ? 'bg-amber-500 text-amber-900' : rank === 2 ? 'bg-slate-300 text-slate-700' : 'bg-amber-700 text-amber-100'}`}>
                  {rank}
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-lg border border-slate-700">👤</div>
                <div>
                  <div className="font-bold text-white">CreatorName_{rank}99</div>
                  <div className="text-xs text-slate-400">Midjourney Pro</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-amber-400">{15000 - (rank * 2000)} Sparks verdient</div>
                <div className="text-xs text-slate-500">4 Arena Siege</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}