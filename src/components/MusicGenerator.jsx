import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function MusicGenerator() {
  const [prompt, setPrompt] = useState('Epic Cyberpunk Synthwave track with heavy bass drops');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const handleGenerate = () => {
    if (!prompt) return toast.error('Prompt fehlt!');
    setLoading(true);
    setAudioUrl(null);
    
    // Simulate generation
    setTimeout(() => {
      setLoading(false);
      setAudioUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // Example royalty free track
      toast.success('Track generiert!');
    }, 4000);
  };

  return (
    <div className="max-w-5xl animate-fade-in mx-auto mt-4">
      <h2 className="text-3xl font-bold mb-2 text-gradient from-teal-400 to-emerald-500">🎵 KI Musik Studio</h2>
      <p className="text-slate-400 mb-8">Generiere komplette Songs inkl. Vocals mit Suno & Udio.</p>

      <div className="glass-panel rounded-3xl p-6 flex flex-col md:flex-row gap-8 items-center">
        
        <div className="flex-1 w-full">
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-32 bg-slate-900/50 border border-slate-700 rounded-xl p-5 text-white focus:border-emerald-500 transition-colors resize-none mb-4 shadow-inner"
            placeholder="Beschreibe deinen Song..."
          />
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className={`w-full font-bold py-3 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 ${loading ? 'bg-emerald-600/50 cursor-not-allowed' : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400'}`}
          >
            {loading ? 'Komponiere Musik...' : '🎛️ Track Generieren'}
          </button>
        </div>

        <div className="w-full md:w-96 glass-card rounded-3xl p-6 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden">
          {loading ? (
            <div className="flex gap-2 items-end h-16 mb-4">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-3 bg-emerald-500 rounded-t-sm animate-bounce" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          ) : audioUrl ? (
            <div className="w-full text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)] animate-pulse">
                <svg className="w-10 h-10 text-white ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <h4 className="font-bold text-slate-200 mb-1">Cyberpunk_Anthem_01</h4>
              <p className="text-xs text-slate-400 mb-4">Suno AI (v3.5)</p>
              <audio src={audioUrl} controls className="w-full outline-none" />
            </div>
          ) : (
            <div className="text-slate-500 flex flex-col items-center">
              <svg className="w-16 h-16 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
              <span>Warte auf Input...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}