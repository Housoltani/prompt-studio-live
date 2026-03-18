import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { soundEngine } from '../utils/SoundEngine';

export default function EbookStudio() {
  const [topic, setTopic] = useState('');
  const [step, setStep] = useState(1); // 1: Input, 2: Generating Outline, 3: Outline Review, 4: Generating Ebook, 5: Done
  const [loading, setLoading] = useState(false);
  const [outline, setOutline] = useState([
    { id: 1, title: 'Einführung in die KI-Kunst', active: true },
    { id: 2, title: 'Midjourney Setup & Grundlagen', active: true },
    { id: 3, title: 'Die perfekten Prompt-Strukturen', active: true },
    { id: 4, title: 'Advanced Parameter (--v 6, --ar)', active: true },
    { id: 5, title: 'Monetarisierung deiner Prompts', active: true }
  ]);

  const [coverUrl, setCoverUrl] = useState('https://picsum.photos/seed/cyberpunk_book/800/1200');
  const [bookTitle, setBookTitle] = useState('Die Midjourney Masterclass');

  const startGeneration = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    soundEngine.playTransform();
    setStep(2);
    setLoading(true);

    // Mock API Call for outline
    setTimeout(() => {
      setStep(3);
      setLoading(false);
      soundEngine.playSuccess();
      setBookTitle(`Das ultimative ${topic} Playbook`);
      setCoverUrl(`https://picsum.photos/seed/${topic.replace(/\\s+/g, '')}/800/1200`);
      toast.success('Inhaltsverzeichnis generiert!', { icon: '📝' });
    }, 2000);
  };

  const finalizeEbook = () => {
    soundEngine.playTransform();
    setStep(4);
    setLoading(true);

    // Mock full book generation
    setTimeout(() => {
      setStep(5);
      setLoading(false);
      soundEngine.playSuccess();
      toast.success('Dein E-Book ist fertig und verkaufsbereit!', { icon: '📚' });
    }, 4000);
  };

  const toggleChapter = (id) => {
    soundEngine.playPop();
    setOutline(outline.map(ch => ch.id === id ? { ...ch, active: !ch.active } : ch));
  };

  return (
    <div className="max-w-7xl animate-fade-in mx-auto mt-4 px-4 pb-20 h-full min-h-[calc(100vh-120px)] flex flex-col">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 flex-shrink-0">
        <div>
          <div className="inline-block bg-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
            Digital Product Creator
          </div>
          <h2 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 tracking-tight">
            📚 E-Book Studio
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
            Verwandle ein Thema in ein fertiges, verkaufbares PDF-E-Book. GPT-4o schreibt den Inhalt, Midjourney generiert das Cover.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        
        {/* LEFT PANEL: CONFIG & PROCESS */}
        <div className="flex-1 glass-card border border-slate-700/50 rounded-3xl p-8 bg-slate-900/80 flex flex-col relative overflow-y-auto">
          
          {/* Progress Tracker */}
          <div className="flex justify-between items-center mb-10 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -z-10 -translate-y-1/2 rounded-full"></div>
            <div className="absolute top-1/2 left-0 h-1 bg-orange-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-500" style={{ width: step === 1 ? '10%' : step === 3 ? '50%' : '100%' }}></div>
            
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all shadow-lg ${step >= 1 ? 'bg-orange-500 text-white shadow-orange-500/40' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>1</div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all shadow-lg ${step >= 3 ? 'bg-orange-500 text-white shadow-orange-500/40' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>2</div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all shadow-lg ${step >= 5 ? 'bg-emerald-500 text-white shadow-emerald-500/40' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>3</div>
          </div>

          {/* STEP 1: INPUT */}
          {step === 1 && (
            <div className="animate-slide-up flex-1 flex flex-col justify-center">
              <h3 className="text-2xl font-black text-white mb-6 text-center">Worüber möchtest du schreiben?</h3>
              <form onSubmit={startGeneration} className="space-y-6 max-w-lg mx-auto w-full">
                <div>
                  <input 
                    type="text" 
                    placeholder="z.B. KI für Marketing, Midjourney Tipps, Passive Income..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-slate-950 border-2 border-slate-700 rounded-2xl px-6 py-5 text-lg text-white focus:border-orange-500 outline-none shadow-inner transition-colors text-center"
                    autoFocus
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-xl">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Sprache</label>
                    <select className="w-full bg-transparent text-sm text-white outline-none font-bold">
                      <option>Deutsch</option>
                      <option>Englisch</option>
                    </select>
                  </div>
                  <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-xl">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Länge</label>
                    <select className="w-full bg-transparent text-sm text-white outline-none font-bold">
                      <option>Kurzer Guide (~20 S.)</option>
                      <option>Masterclass (~50 S.)</option>
                    </select>
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={!topic.trim() || loading}
                  className={`w-full py-4 rounded-xl font-black text-lg transition-all shadow-[0_0_30px_rgba(249,115,22,0.2)] flex justify-center items-center gap-2 ${!topic.trim() ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-900 hover:scale-105'}`}
                >
                  Struktur generieren 🚀
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: LOADING OUTLINE */}
          {step === 2 && (
            <div className="animate-fade-in flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-8 shadow-[0_0_30px_rgba(249,115,22,0.3)]"></div>
              <h3 className="text-xl font-bold text-white mb-2">Analysiere das Thema...</h3>
              <p className="text-slate-400 text-sm font-mono uppercase tracking-widest animate-pulse">GPT-4 generiert Inhaltsverzeichnis</p>
            </div>
          )}

          {/* STEP 3: REVIEW OUTLINE & COVER */}
          {step === 3 && (
            <div className="animate-slide-up flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-white">Inhaltsverzeichnis prüfen</h3>
                <span className="text-xs bg-slate-800 text-orange-400 px-3 py-1.5 rounded-lg font-bold border border-slate-700">
                  {outline.filter(o => o.active).length} Kapitel ausgewählt
                </span>
              </div>
              
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 mb-8 flex-1 overflow-y-auto">
                <div className="space-y-3">
                  {outline.map((chapter, idx) => (
                    <div 
                      key={chapter.id} 
                      onClick={() => toggleChapter(chapter.id)}
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${chapter.active ? 'bg-orange-500/10 border-orange-500/50 shadow-inner' : 'bg-slate-900 border-slate-800 opacity-50 grayscale hover:opacity-100 hover:grayscale-0'}`}
                    >
                      <div className={`w-6 h-6 flex-shrink-0 rounded flex items-center justify-center text-xs font-bold transition-colors ${chapter.active ? 'bg-orange-500 text-white' : 'bg-slate-800 border border-slate-600'}`}>
                        {chapter.active && '✓'}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-orange-400 font-bold uppercase tracking-widest mb-1">Kapitel {idx + 1}</div>
                        <div className={`text-sm font-bold ${chapter.active ? 'text-white' : 'text-slate-400'}`}>{chapter.title}</div>
                      </div>
                      <div className="text-slate-500 hover:text-white cursor-grab">≡</div>
                    </div>
                  ))}
                  
                  <div className="flex gap-3 pt-4 border-t border-slate-800 mt-4">
                    <input type="text" placeholder="Neues Kapitel hinzufügen..." className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500" />
                    <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl border border-slate-600 transition-colors">
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="text-xl">💰</div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Geschätzte Kosten</div>
                    <div className="text-sm font-bold text-amber-400">15 Sparks</div>
                  </div>
                </div>
                <button 
                  onClick={finalizeEbook}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-900 font-black px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all transform hover:-translate-y-1 flex items-center gap-2"
                >
                  Buch verfassen lassen ✍️
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: GENERATING FULL BOOK */}
          {step === 4 && (
            <div className="animate-fade-in flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 relative mb-8">
                <div className="absolute inset-0 border-4 border-orange-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-3xl">🤖</div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Schreibe Manuskript...</h3>
              <div className="space-y-2 mt-4 text-left bg-slate-950 p-4 rounded-xl border border-slate-800 min-w-[300px]">
                <div className="flex items-center gap-3 text-sm text-emerald-400"><span className="animate-pulse">▶</span> Generiere Kapitel 1...</div>
                <div className="flex items-center gap-3 text-sm text-slate-500 opacity-50">Generiere Kapitel 2...</div>
                <div className="flex items-center gap-3 text-sm text-slate-500 opacity-50">Generiere Kapitel 3...</div>
              </div>
            </div>
          )}

          {/* STEP 5: DONE */}
          {step === 5 && (
            <div className="animate-slide-up flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-5xl mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)] border-2 border-emerald-500/50">
                🎉
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Dein Produkt ist fertig!</h3>
              <p className="text-slate-400 mb-8 max-w-md">Das Manuskript wurde mit dem Midjourney Cover verschmolzen. Es liegt nun in deinem Workspace bereit.</p>
              
              <div className="flex gap-4">
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2">
                  ⬇️ Als PDF herunterladen
                </button>
                <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-xl border border-slate-600 transition-colors flex items-center gap-2">
                  🛒 Im Marktplatz anbieten
                </button>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT PANEL: LIVE PREVIEW */}
        <div className="w-full lg:w-[400px] flex-shrink-0 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-[2rem] border border-slate-700/50 bg-slate-900/80 flex flex-col items-center justify-center h-full min-h-[500px] relative overflow-hidden group">
            
            <div className="absolute top-4 left-4 bg-slate-950/80 text-[10px] text-slate-400 uppercase tracking-widest font-black px-3 py-1.5 rounded-md border border-slate-800 shadow-lg z-20">
              Live Vorschau
            </div>

            {step >= 3 ? (
              <div className="relative w-64 h-[25rem] rounded-xl shadow-2xl shadow-black/50 border border-slate-700/50 transform group-hover:scale-105 group-hover:-rotate-2 transition-transform duration-500 bg-slate-800 overflow-hidden flex flex-col">
                {/* Book Cover Image */}
                <div className="h-3/5 w-full relative">
                  <img src={coverUrl} alt="Book Cover" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                  {/* Regeneration Button for Cover */}
                  {step === 3 && (
                    <button onClick={() => { soundEngine.playPop(); setCoverUrl(`https://picsum.photos/seed/${Math.random()}/800/1200`); }} className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black transition-colors text-xs border border-white/20">
                      🔄
                    </button>
                  )}
                </div>
                {/* Book Title Area */}
                <div className="flex-1 bg-slate-900 p-5 flex flex-col justify-center items-center text-center border-t-2 border-orange-500/50">
                  <div className="text-[8px] font-bold text-orange-400 uppercase tracking-[0.3em] mb-2">Prompt Studio Edition</div>
                  <h4 className="text-white font-black text-lg leading-tight line-clamp-3">{bookTitle}</h4>
                  <div className="mt-4 w-8 h-1 bg-slate-700 rounded-full"></div>
                </div>
              </div>
            ) : (
              <div className="w-64 h-[25rem] rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/30 flex flex-col items-center justify-center text-slate-600 gap-4 opacity-50">
                <div className="text-6xl">📖</div>
                <div className="text-xs font-bold uppercase tracking-widest text-center px-4">Gib ein Thema ein, um das Cover zu generieren</div>
              </div>
            )}
            
          </div>
        </div>

      </div>
    </div>
  );
}